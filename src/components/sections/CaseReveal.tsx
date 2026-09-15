"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";

/**
 * Cinematic mask reveal for case-study media. Reduced motion gets a plain
 * fade — the composition is identical either way.
 */
export function CaseReveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();

  // Same properties in both branches — see the note in MaskLine.
  return (
    <motion.div
      initial={{
        clipPath: reduced ? "inset(0% 0 0% 0)" : "inset(12% 0 12% 0)",
        opacity: 0,
      }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: reduced ? 0.3 : 1.2, ease: EASE_EXPO, delay: reduced ? 0 : delay }}
      className="will-change-[clip-path]"
    >
      {children}
    </motion.div>
  );
}
