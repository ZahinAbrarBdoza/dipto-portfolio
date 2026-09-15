import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Portrait plate.

   Drawn, not photographed: a head-and-shoulders envelope resolved into
   horizontal hairlines, the way a plate is screened for print. It sits in the
   same visual language as the project art, recolours with the theme, costs one
   inline SVG, and is trivially swapped for a real photograph later — replace
   the <svg> with <Image> and keep the frame.
   ══════════════════════════════════════════════════════════════════════════ */

const W = 800;
const H = 1000;
const TOP = 96;
const STEP = 7;

/** Half-width of the silhouette at a given y — head, neck, then shoulders. */
function envelope(y: number): number {
  const headCy = 320;
  const headRx = 158;
  const headRy = 214;

  if (y < headCy + headRy - 12) {
    const t = (y - headCy) / headRy;
    if (Math.abs(t) >= 1) return 0;
    return headRx * Math.sqrt(1 - t * t);
  }
  if (y < 580) return 74;

  const shoulder = (y - 580) / (H - 580);
  return Math.min(352, 74 + Math.sin(shoulder * 1.35) * 340);
}

function wobble(i: number): number {
  // Deterministic pseudo-noise so the plate has grain without a random seed.
  return (
    Math.sin(i * 0.7) * 5 + Math.sin(i * 0.23 + 1.7) * 8 + Math.sin(i * 1.9 + 0.4) * 2.5
  );
}

/**
 * Math.sin is not required to be bit-identical across engines, and the server
 * (Node's V8) and the browser's V8 are different builds. Unrounded, the last
 * few digits of these coordinates differ between the two, every line of the
 * plate serialises differently, and React reports a hydration mismatch.
 * Two decimals is far below anything visible at this viewBox.
 */
const q = (n: number): number => Math.round(n * 100) / 100;

export function Portrait({ className }: { className?: string }) {
  const lines: { y: number; x1: number; x2: number; o: number; accent: boolean }[] = [];

  for (let y = TOP; y < H; y += STEP) {
    const half = envelope(y);
    if (half <= 2) continue;

    const i = (y - TOP) / STEP;
    const jitter = wobble(i);
    const cx = 400 + jitter * 0.35;
    const width = half + jitter;

    // Density falls off toward the crown and rises across the shoulders.
    const depth = y > 580 ? 0.72 : 0.4 + (y - TOP) / 620;
    const flicker = (Math.sin(i * 2.3) + 1) / 2;

    lines.push({
      y,
      x1: q(cx - width),
      x2: q(cx + width),
      o: q(Math.min(0.9, 0.16 + depth * 0.5 + flicker * 0.16)),
      accent: i > 26 && i < 33,
    });
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Abstract line portrait of ${profile.fullName}`}
      // Ink comes through `currentColor`; see the note in ProjectVisual.
      style={{ color: "var(--ink)" }}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="portrait-glow" cx="50%" cy="38%" r="55%">
          <stop offset="0%" style={{ stopColor: "var(--accent)" }} stopOpacity="0.3" />
          <stop offset="100%" style={{ stopColor: "var(--accent)" }} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="portrait-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="45%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
        </linearGradient>
        <mask id="portrait-mask">
          <rect width={W} height={H} fill="url(#portrait-fade)" />
        </mask>
      </defs>

      <rect width={W} height={H} style={{ fill: "var(--surface)" }} />
      <ellipse cx={400} cy={360} rx={340} ry={340} fill="url(#portrait-glow)" />

      {/* Registration grid */}
      <g stroke="currentColor" strokeOpacity="0.055">
        {[1, 2, 3].map((i) => (
          <line key={i} x1={(W / 4) * i} y1="0" x2={(W / 4) * i} y2={H} />
        ))}
        <line x1="0" y1={TOP} x2={W} y2={TOP} />
      </g>

      <g mask="url(#portrait-mask)" strokeLinecap="round">
        {lines.map((line) => (
          <line
            key={line.y}
            x1={line.x1}
            y1={line.y}
            x2={line.x2}
            y2={line.y}
            {...(line.accent
              ? { style: { stroke: "var(--accent)" } }
              : { stroke: "currentColor" })}
            strokeOpacity={line.accent ? 0.95 : line.o}
            strokeWidth={line.accent ? 3.5 : 3}
          />
        ))}
      </g>

      {/* Plate marks */}
      <g stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
        <path d="M40 72 V40 H72" />
        <path d={`M${W - 72} 40 H${W - 40} V72`} />
      </g>
      {/* Sits in the empty top-left corner, clear of the shoulders. */}
      <text
        x={40}
        y={TOP + 40}
        fill="currentColor"
        opacity="0.42"
        style={{ fontFamily: "var(--font-mono), monospace" }}
        fontSize="19"
        letterSpacing="4"
      >
        PLATE 01 — {(profile.location.split(",")[0] ?? "").toUpperCase()}
      </text>
    </svg>
  );
}
