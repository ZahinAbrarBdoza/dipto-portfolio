import type { CSSProperties } from "react";
import type { ArtVariant } from "@/data/types";
import { cn } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   Generated project art.

   No stock photography, no placeholder greys. Each project gets a drawn
   composition in the same visual language as the site — hairlines, tabular
   marks, one accent. Rendered as inline SVG on the server: zero requests,
   zero layout shift, sharp at any density, and it recolours with the theme.

   Colour rule: the root <svg> carries `color: var(--ink)` and everything
   ink-toned paints with `currentColor` plus an opacity. `var()` inside SVG
   presentation attributes is unreliable in WebKit, so the handful of places
   that need a different token use inline `style` instead, which is not.

   `seed` keeps every composition deterministic so server and client agree.
   ══════════════════════════════════════════════════════════════════════════ */

const W = 1200;
const H = 800;

/** Ink opacities standing in for the border tokens. */
const LINE_FAINT = 0.055;
const LINE = 0.1;
const LINE_STRONG = 0.18;

const surfaceFill: CSSProperties = { fill: "var(--surface)" };
const rootStyle: CSSProperties = { color: "var(--ink)" };

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* ── Shared chrome ──────────────────────────────────────────────────────── */

function Defs({ id, accent }: { id: string; accent: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-ground`} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--surface-2)" }} />
        <stop offset="100%" style={{ stopColor: "var(--bg-deep)" }} />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
        <stop offset="60%" stopColor={accent} stopOpacity="0.12" />
        <stop offset="100%" stopColor={accent} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
      </linearGradient>
      <clipPath id={`${id}-clip`}>
        <rect x="0" y="0" width={W} height={H} />
      </clipPath>
    </defs>
  );
}

function Grid({ step = 60, opacity = 1 }: { step?: number; opacity?: number }) {
  const cols = Math.floor(W / step);
  const rows = Math.floor(H / step);
  return (
    <g
      stroke="currentColor"
      strokeOpacity={LINE_FAINT}
      strokeWidth="1"
      opacity={opacity}
    >
      {Array.from({ length: cols }, (_, i) => (
        <line key={`v${i}`} x1={(i + 1) * step} y1="0" x2={(i + 1) * step} y2={H} />
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={(i + 1) * step} x2={W} y2={(i + 1) * step} />
      ))}
    </g>
  );
}

/** Rows of tiny bars that read as text at a glance — an editorial texture. */
function TextTexture({
  x,
  y,
  width,
  rows,
  seed,
  lineHeight = 18,
}: {
  x: number;
  y: number;
  width: number;
  rows: number;
  seed: number;
  lineHeight?: number;
}) {
  const rand = rng(seed);
  return (
    <g fill="currentColor" opacity="0.16">
      {Array.from({ length: rows }, (_, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * lineHeight}
          width={width * (0.55 + rand() * 0.45)}
          height="3"
          rx="1.5"
        />
      ))}
    </g>
  );
}

/* ── Variants ───────────────────────────────────────────────────────────── */

function Terminal({ id, accent }: { id: string; accent: string }) {
  const rand = rng(hashString(id));
  const bars = Array.from({ length: 46 }, (_, i) => {
    const height = 40 + rand() * 300;
    return { x: 96 + i * 21, h: height, y: 420 - height * (0.35 + rand() * 0.4), i };
  });
  const path = bars
    .map((b, i) => `${i === 0 ? "M" : "L"}${b.x + 4},${b.y + b.h * 0.42}`)
    .join(" ");

  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-ground)`} />
      <Grid step={60} />
      <ellipse cx={880} cy={200} rx={420} ry={280} fill={`url(#${id}-glow)`} opacity="0.5" />

      <g>
        {bars.map((b) => (
          <rect
            key={b.i}
            x={b.x}
            y={b.y}
            width="8"
            height={b.h}
            rx="1"
            fill={b.i % 11 === 4 ? accent : "currentColor"}
            opacity={b.i % 11 === 4 ? 0.9 : 0.22}
          />
        ))}
      </g>

      <path d={path} fill="none" stroke={accent} strokeWidth="2" opacity="0.85" />

      <line
        x1="0"
        y1="500"
        x2={W}
        y2="500"
        stroke="currentColor"
        strokeOpacity={LINE_STRONG}
      />

      <g fill="currentColor">
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={96}
            y={540 + i * 18}
            width={60 + rand() * 420}
            height="6"
            rx="3"
            opacity={0.06 + (i % 4) * 0.03}
          />
        ))}
      </g>

      {/* Order ticket */}
      <rect
        x={856}
        y={520}
        width={248}
        height={212}
        rx="6"
        style={surfaceFill}
        stroke="currentColor"
        strokeOpacity={LINE}
      />
      <rect x={880} y={548} width={92} height="6" rx="3" fill={accent} />
      <TextTexture x={880} y={576} width={200} rows={5} seed={7} />
      <rect x={880} y={678} width={200} height={30} rx="15" fill={accent} opacity="0.9" />

      <g stroke="currentColor" strokeOpacity={LINE_STRONG} strokeWidth="1.5" fill="none">
        <path d="M40 76 V40 H76" />
        <path d={`M${W - 76} 40 H${W - 40} V76`} />
      </g>
    </>
  );
}

function Bloom({ id, accent }: { id: string; accent: string }) {
  // Seeded like the others: with fixed literals, a project whose lead visual
  // and one gallery frame both used Bloom drew the identical picture twice.
  const rand = rng(hashString(id) ^ 0x85ebca6b);
  const count = 12 + Math.floor(rand() * 5);
  const gap = 46 + rand() * 18;
  const arcs = Array.from({ length: count }, (_, i) => 120 + i * gap);
  const litArc = 3 + Math.floor(rand() * (count - 5));
  const nodeDrop = Array.from({ length: 4 }, () => 48 + rand() * 62);

  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-ground)`} />
      <ellipse cx={600} cy={H} rx={640} ry={520} fill={`url(#${id}-glow)`} opacity="0.6" />

      <g fill="none" strokeWidth="1.25">
        {arcs.map((r, i) => (
          <circle
            key={r}
            cx={600}
            cy={H - 40}
            r={r}
            stroke={i === litArc ? accent : "currentColor"}
            strokeOpacity={i === litArc ? 0.9 : 0.13}
            strokeDasharray={i % 3 === 1 ? "2 10" : undefined}
          />
        ))}
      </g>

      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              x1={210 + i * 260}
              y1={140}
              x2={210 + i * 260}
              y2={H - 40}
              stroke="currentColor"
              strokeOpacity={LINE}
            />
            <circle
              cx={210 + i * 260}
              cy={140 + (nodeDrop[i] ?? 60) * i}
              r={i === 1 ? 9 : 5}
              fill={i === 1 ? accent : "currentColor"}
              opacity={i === 1 ? 1 : 0.45}
            />
            <rect
              x={210 + i * 260 + 22}
              y={132 + (nodeDrop[i] ?? 60) * i}
              width={110 - i * 14}
              height="5"
              rx="2.5"
              fill="currentColor"
              opacity="0.2"
            />
          </g>
        ))}
      </g>

      <line
        x1="96"
        y1="96"
        x2={W - 96}
        y2="96"
        stroke="currentColor"
        strokeOpacity={LINE_STRONG}
      />
    </>
  );
}

function Editorial({ id, accent }: { id: string; accent: string }) {
  // Seeded for the same reason as Bloom — see the note there.
  const rand = rng(hashString(id) ^ 0xc2b2ae35);
  const split = 560 + Math.round(rand() * 140);
  const rowsTop = 10 + Math.floor(rand() * 5);
  const rowsLow = 4 + Math.floor(rand() * 4);
  const ringX = 980 + Math.round(rand() * 110);
  const ringY = 560 + Math.round(rand() * 130);

  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-ground)`} />
      <ellipse cx={240} cy={120} rx={380} ry={260} fill={`url(#${id}-glow)`} opacity="0.35" />

      {/* Oversized serif glyph, cropped by the frame. A percent sign rather
          than a ligature: this is a portfolio about numbers, and the mark
          should say so. Latin-only, so Instrument Serif actually has it. */}
      <text
        x={72}
        y={720}
        style={{ fontFamily: "var(--font-display), Georgia, serif", fontStyle: "italic" }}
        fontSize="660"
        fill={`url(#${id}-fade)`}
      >
        %
      </text>

      <g stroke="currentColor" strokeOpacity={LINE_STRONG}>
        <line x1={split} y1="0" x2={split} y2={H} />
        <line x1={split} y1="180" x2={W} y2="180" />
      </g>
      <rect x={split + 48} y={116} width={84} height="4" fill={accent} />
      <TextTexture
        x={split + 48}
        y={230}
        width={W - split - 130}
        rows={rowsTop}
        seed={hashString(id) & 0xffff}
        lineHeight={22}
      />
      <TextTexture
        x={split + 48}
        y={560}
        width={(W - split - 130) * 0.68}
        rows={rowsLow}
        seed={(hashString(id) >>> 8) & 0xffff}
        lineHeight={22}
      />
      <circle cx={ringX} cy={ringY} r={56} fill="none" stroke={accent} strokeWidth="1.5" />
      <circle cx={ringX} cy={ringY} r={5} fill={accent} />
    </>
  );
}

function System({ id, accent }: { id: string; accent: string }) {
  const rand = rng(hashString(id) ^ 0x9e3779b9);
  const cols = 8;
  const rows = 5;
  const cell = 118;
  const ox = (W - cols * cell) / 2;
  const oy = (H - rows * cell) / 2;

  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-ground)`} />
      <Grid step={cell} opacity={0.8} />
      <ellipse cx={300} cy={680} rx={420} ry={300} fill={`url(#${id}-glow)`} opacity="0.4" />

      <g>
        {Array.from({ length: cols * rows }, (_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          const roll = rand();
          const x = ox + c * cell + 10;
          const y = oy + r * cell + 10;
          const size = cell - 20;
          const isAccent = i === 11 || i === 26 || i === 34;
          const paint = isAccent ? accent : "currentColor";
          // Floor raised: at the old 0.05 base the tile wall all but vanished
          // against the dark ground and the composition read as empty.
          const opacity = isAccent ? 0.92 : 0.11 + roll * 0.24;

          if (roll > 0.82) {
            return (
              <circle
                key={i}
                cx={x + size / 2}
                cy={y + size / 2}
                r={size / 2}
                fill="none"
                stroke={paint}
                strokeOpacity={opacity + 0.1}
                strokeWidth="1.5"
              />
            );
          }
          if (roll > 0.62) {
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={size}
                height={size / 2}
                rx={size / 4}
                fill={paint}
                opacity={opacity}
              />
            );
          }
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={size}
              height={size}
              rx={roll > 0.4 ? 8 : 2}
              fill={paint}
              opacity={opacity}
            />
          );
        })}
      </g>

      <line
        x1={ox}
        y1={oy - 34}
        x2={ox + cols * cell}
        y2={oy - 34}
        stroke={accent}
        strokeWidth="2"
      />
    </>
  );
}

function Orbital({ id, accent }: { id: string; accent: string }) {
  const rand = rng(hashString(id) ^ 0x2545f491);
  const cx = 600;
  const cy = 400;
  // Rounded because Math.cos/sin are not bit-identical between the server's
  // V8 and the browser's, and the raw values hydrate as a mismatch.
  const q = (n: number) => Math.round(n * 100) / 100;
  const nodes = Array.from({ length: 18 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const radius = 150 + rand() * 300;
    return {
      x: q(cx + Math.cos(angle) * radius * 1.25),
      y: q(cy + Math.sin(angle) * radius * 0.72),
      r: q(2.5 + rand() * 4.5),
      i,
    };
  });

  return (
    <>
      <rect width={W} height={H} fill={`url(#${id}-ground)`} />
      <ellipse cx={cx} cy={cy} rx={400} ry={300} fill={`url(#${id}-glow)`} opacity="0.55" />

      <g fill="none" stroke="currentColor" strokeOpacity="0.12">
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={190 + i * 118}
            ry={110 + i * 68}
            transform={`rotate(${-16 + i * 9} ${cx} ${cy})`}
          />
        ))}
      </g>

      <g stroke={accent} strokeOpacity="0.22" strokeWidth="1">
        {nodes.slice(0, 9).map((n) => (
          <line key={n.i} x1={cx} y1={cy} x2={n.x} y2={n.y} />
        ))}
      </g>

      <g>
        {nodes.map((n) => (
          <circle
            key={n.i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.i % 7 === 2 ? accent : "currentColor"}
            opacity={n.i % 7 === 2 ? 1 : 0.42}
          />
        ))}
      </g>

      <circle cx={cx} cy={cy} r={26} fill={accent} />
      <circle cx={cx} cy={cy} r={46} fill="none" stroke={accent} strokeOpacity="0.4" />
      <line
        x1="96"
        y1={H - 96}
        x2={420}
        y2={H - 96}
        stroke="currentColor"
        strokeOpacity={LINE_STRONG}
      />
    </>
  );
}

const VARIANTS: Record<ArtVariant, typeof Terminal> = {
  terminal: Terminal,
  bloom: Bloom,
  editorial: Editorial,
  system: System,
  orbital: Orbital,
};

/* ── Technical overlay (the second frame, revealed on hover) ─────────────── */

function Annotations({ label, accent }: { label: string; accent: string }) {
  return (
    <g className="annotations" opacity="0">
      <g stroke={accent} strokeWidth="1.25">
        <line x1="0" y1="400" x2={W} y2="400" strokeDasharray="6 10" opacity="0.5" />
        <line x1="600" y1="0" x2="600" y2={H} strokeDasharray="6 10" opacity="0.5" />
        <path d="M96 120 h120 M96 112 v16 M216 112 v16" opacity="0.8" />
      </g>
      <circle cx="600" cy="400" r="54" fill="none" stroke={accent} strokeWidth="1.25" />
      <circle cx="600" cy="400" r="3" fill={accent} />
      <text
        x="232"
        y="126"
        fill={accent}
        style={{ fontFamily: "var(--font-mono), monospace" }}
        fontSize="20"
        letterSpacing="3"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

interface ProjectVisualProps {
  variant: ArtVariant;
  accent: string;
  /** Unique per instance — drives the deterministic composition. */
  seed: string;
  label?: string;
  className?: string;
}

export function ProjectVisual({
  variant,
  accent,
  seed,
  label,
  className,
}: ProjectVisualProps) {
  const id = `art-${seed}`;
  const Variant = VARIANTS[variant];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `Abstract visual: ${label}` : "Abstract project visual"}
      style={rootStyle}
      className={cn("h-full w-full", className)}
    >
      <Defs id={id} accent={accent} />
      <g clipPath={`url(#${id}-clip)`}>
        <Variant id={id} accent={accent} />
        {label ? <Annotations label={label} accent={accent} /> : null}
      </g>
    </svg>
  );
}
