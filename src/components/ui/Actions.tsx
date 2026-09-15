"use client";

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/* ── Magnetic wrapper ───────────────────────────────────────────────────── */

interface MagneticProps {
  children: ReactNode;
  /** How far the element may travel, as a fraction of pointer offset. */
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.28, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const active = fine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!active || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [active, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={active ? { x: sx, y: sy } : undefined}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

/* ── Arrow ──────────────────────────────────────────────────────────────── */

export function Arrow({ className, dir = "ne" }: { className?: string; dir?: "ne" | "e" | "s" }) {
  const rotation = dir === "ne" ? "-rotate-45" : dir === "s" ? "rotate-90" : "";
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("h-[0.85em] w-[0.85em] flex-none", rotation, className)}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/* ── Action link ────────────────────────────────────────────────────────── */

type Variant = "primary" | "outline" | "ghost";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  arrow?: "ne" | "e" | "s" | false;
  /** Announced to screen readers when the visible label is terse. */
  ariaLabel?: string;
  onClick?: () => void;
}

// Every variant carries a border, transparent where it is not drawn: with
// height:auto the border is not absorbed, so giving it to `outline` alone made
// that pill 2px taller than the one beside it.
const base =
  "group/act relative inline-flex items-center gap-2.5 overflow-hidden rounded-full " +
  "border border-transparent font-medium tracking-[-0.01em] transition-colors duration-300 " +
  "px-[1.35rem] py-[0.7rem] text-[0.9rem] sm:px-6 sm:py-3 sm:text-[0.95rem]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-ink hover:text-bg",
  outline: "border-line-strong text-ink hover:border-accent hover:text-accent",
  ghost: "text-dim hover:text-ink px-0 py-1",
};

/**
 * The site's one button. Label slides up and is replaced by a copy of itself,
 * so the motion reads as a mechanism rather than a hover effect.
 */
export function ActionLink({
  href,
  children,
  variant = "primary",
  className,
  magnetic = true,
  arrow = "ne",
  ariaLabel,
  onClick,
}: ActionLinkProps) {
  const isHash = href.startsWith("#") || href.startsWith("/#");
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    if (!isHash) return;
    const id = href.split("#")[1];
    // Only intercept same-page hashes; deep links from /work/* still navigate.
    if (id && window.location.pathname === "/") {
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
      scrollToId(id);
    }
  };

  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover/act:translate-y-0">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:translate-y-0 motion-reduce:hidden"
        >
          {children}
        </span>
      </span>
      {arrow ? (
        <Arrow
          dir={arrow}
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/act:translate-x-[3px] group-hover/act:-translate-y-[3px] motion-reduce:transition-none"
        />
      ) : null}
    </>
  );

  const classes = cn(base, variants[variant], className);
  const linkProps = {
    className: classes,
    "aria-label": ariaLabel,
    "data-cursor": "link",
    onClick: handleClick,
  };

  const node = isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
      {inner}
    </a>
  ) : (
    <Link href={href} {...linkProps}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{node}</Magnetic> : node;
}

/* ── Scroll indicator ───────────────────────────────────────────────────── */

export function ScrollCue({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(targetId)}
      data-cursor="link"
      className="group inline-flex items-center gap-3 text-faint transition-colors duration-300 hover:text-ink"
      aria-label="Scroll to selected work"
    >
      <span className="mono">Scroll</span>
      <span className="relative block h-8 w-[1px] overflow-hidden bg-line-strong">
        <span className="absolute inset-x-0 top-0 block h-3 animate-[cue_2.4s_var(--ease-out-quint)_infinite] bg-accent" />
      </span>
    </button>
  );
}

/* ── Value counter ──────────────────────────────────────────────────────── */

/**
 * Counts up to a value when it scrolls into view.
 *
 * The real number is the resting state: it renders on the server, with JS off,
 * to a screen reader reading ahead, and to anyone who never scrolls this far.
 * Only once the element is actually in view does it swap to the animated value
 * and run 0 → value, so there is no code path that can leave a "0" on screen
 * where a 3 belongs.
 *
 * The viewport margin insets the bottom only. A margin applied to all four
 * sides also insets left and right, and at 390px that was enough to exclude
 * the narrow left-column counters entirely — they never fired.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const progress = useMotionValue(0);
  // Near-critically damped (critical is ~17.9 here): lands on the final
  // integer quickly instead of creeping up to it, and never overshoots.
  const spring = useSpring(progress, { stiffness: 80, damping: 18, mass: 1 });
  const display = useTransform(spring, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) progress.set(value);
  }, [inView, progress, value]);

  const resting = `${prefix}${value}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {inView && !reduced ? <motion.span>{display}</motion.span> : resting}
    </span>
  );
}
