import { NextResponse } from "next/server";
import { profile, scopeLabel } from "@/data/profile";

export const runtime = "nodejs";

/* ══════════════════════════════════════════════════════════════════════════
   Contact endpoint.

   Validates on the server (never trust the client's own validation), drops
   honeypot hits silently, and rate-limits per IP. Delivery goes through
   Web3Forms when WEB3FORMS_ACCESS_KEY is set; without it the route answers 503
   with a plain message so the form can point people at the direct address
   instead of pretending a message was delivered.

   To swap providers, replace `deliver()` — nothing else here changes.
   ══════════════════════════════════════════════════════════════════════════ */

interface Payload {
  name: string;
  email: string;
  company?: string;
  scope?: string;
  message: string;
  website?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;

/** Best-effort in-memory limiter. Swap for a shared store behind >1 instance. */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(body: Payload): string | null {
  if (body.name.length < 2) return "Please include your name.";
  if (!EMAIL_PATTERN.test(body.email)) return "That email address does not look right.";
  if (body.message.length < 20) return "Please include a little more detail.";
  return null;
}

/**
 * Delivery via Web3Forms.
 *
 * Chosen over an email API like Resend because it needs no verified domain:
 * paste an access key and mail arrives at your inbox. Domain-based senders can
 * only deliver to their own signup address until a domain is verified, which
 * makes a contact form useless on a free `.vercel.app` host.
 *
 * To move to Resend/Postmark/SES later, replace the body of this function.
 * Nothing else in the route changes.
 */
async function deliver(body: Payload) {
  const key = process.env.WEB3FORMS_ACCESS_KEY;
  if (!key) return { ok: false as const, configured: false };

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: key,
      subject: `Portfolio enquiry — ${body.name}${body.company ? ` (${body.company})` : ""}`,
      from_name: `${profile.fullName} portfolio`,
      // So hitting Reply in your mail client answers the sender, not the form.
      replyto: body.email,
      name: body.name,
      email: body.email,
      company: body.company || "—",
      "what they need": scopeLabel(body.scope ?? ""),
      message: body.message,
    }),
  });

  // Web3Forms answers 200 with {success:false} for a bad key, so check both.
  const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return { ok: response.ok && data?.success === true, configured: true };
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { message: "That is a lot of messages. Try again in a minute." },
      { status: 429 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ message: "Malformed request." }, { status: 400 });
  }

  const source = (raw ?? {}) as Record<string, unknown>;
  const body: Payload = {
    name: clean(source.name, 120),
    email: clean(source.email, 180),
    company: clean(source.company, 160),
    scope: clean(source.scope, 60),
    message: clean(source.message, 4000),
    website: clean(source.website, 200),
  };

  // Honeypot: accept and discard, so the bot learns nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const problem = validate(body);
  if (problem) return NextResponse.json({ message: problem }, { status: 422 });

  try {
    const result = await deliver(body);

    if (!result.configured) {
      return NextResponse.json(
        {
          message:
            "The form is not connected to an inbox yet, so this did not send. Email me directly:",
        },
        { status: 503 },
      );
    }

    if (!result.ok) {
      return NextResponse.json(
        { message: "That did not go through. Email me directly:" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Something broke on my side. Email me directly:" },
      { status: 500 },
    );
  }
}
