import type { Transition, Variants } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════
   Motion language
   Two easing curves only. Everything in the site is built from them so the
   whole page feels like one hand tuned it.
   ══════════════════════════════════════════════════════════════════════════ */

export const EASE_SIGNAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const spring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 1,
};

/** Standard scroll-entrance viewport config: fires once, slightly early. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

/* ── Line / word reveals ────────────────────────────────────────────────── */

export const lineMask: Variants = {
  hidden: { y: "110%" },
  show: (i = 0) => ({
    y: "0%",
    transition: { duration: 0.95, ease: EASE_EXPO, delay: 0.06 * i },
  }),
};

export const wordMask: Variants = {
  hidden: { y: "115%", opacity: 0 },
  show: (i = 0) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_EXPO, delay: 0.035 * i },
  }),
};

/* ── Section entrances ──────────────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_SIGNAL, delay: 0.07 * i },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_SIGNAL, delay: 0.07 * i },
  }),
};

export const stagger = (amount = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: amount, delayChildren: delay } },
});

/** Hairline rules that draw themselves left to right. */
export const ruleDraw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE_EXPO } },
};

/** Reduced motion: same choreography, no displacement. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};
