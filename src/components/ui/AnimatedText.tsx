"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { EASE_EXPO } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface MaskLineProps {
  children: ReactNode;
  /** Stagger position among sibling lines. */
  index?: number;
  delay?: number;
  className?: string;
  /** Animate on mount instead of on scroll — used above the fold. */
  immediate?: boolean;
}

/**
 * One line of display type behind a mask. The wrapper clips; the inner span
 * slides up from below it.
 *
 * Two things here are deliberate and both were bugs first:
 *
 * 1. The viewport trigger watches the *wrapper*, never the span that moves. A
 *    span parked at y:112% inside an overflow-hidden parent has an empty
 *    intersection rect, so an observer on it would never report it visible and
 *    the line would stay hidden for good.
 * 2. The animation is plain objects rather than variants, so it cannot be
 *    hijacked by variant propagation from a motion ancestor — these lines sit
 *    inside animated figures and headers all over the site.
 */
export function MaskLine({
  children,
  index = 0,
  delay = 0,
  className,
  immediate = false,
}: MaskLineProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const show = immediate || inView;

  const transition = {
    duration: reduced ? 0.3 : 1,
    ease: EASE_EXPO,
    delay: reduced ? 0 : delay + index * 0.085,
  };

  // Always the same two properties. `reduced` only resolves after mount, and a
  // target that suddenly stops mentioning `y` leaves the line parked outside
  // its own mask for good.
  return (
    <span ref={ref} className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: reduced ? "0%" : "112%", opacity: reduced ? 0 : 1 }}
        animate={{
          y: reduced || show ? "0%" : "112%",
          opacity: reduced && !show ? 0 : 1,
        }}
        transition={transition}
      >
        {children}
        {/* Collapses visually; keeps lines separate in the accessibility tree. */}{" "}
      </motion.span>
    </span>
  );
}
