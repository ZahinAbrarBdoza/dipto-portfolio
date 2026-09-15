"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { INTRO_DURATION, introWillPlay, markIntroPlayed } from "@/lib/intro";
import { EASE_EXPO, EASE_SIGNAL } from "@/lib/motion";
import { startScroll, stopScroll } from "@/lib/scroll";

/**
 * Opening sequence — just over a second, once per session.
 *
 * It is a title card, not a loading bar: monogram, a counter, the positioning
 * line, then a curtain that lifts. Skipped entirely on repeat visits within the
 * session and under reduced motion, where it resolves immediately rather than
 * making anyone wait for a decoration.
 *
 * It gates nothing. The page underneath animates on its own schedule, so a
 * failure here can never leave content hidden.
 */

/** Splits a two-part role on "&" for the italic ampersand, without assuming one. */
const roleParts = profile.role.split(/\s+&\s+/);

export function Preloader() {
  const [visible, setVisible] = useState(true);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));
  const progress = useTransform(count, (v) => v / 100);

  useEffect(() => {
    if (!introWillPlay()) {
      setVisible(false);
      return;
    }

    markIntroPlayed();
    stopScroll();

    const controls = animate(count, 100, {
      duration: INTRO_DURATION - 0.2,
      ease: EASE_SIGNAL,
    });
    const timer = window.setTimeout(() => {
      setVisible(false);
      startScroll();
    }, INTRO_DURATION * 1000);

    return () => {
      controls.stop();
      window.clearTimeout(timer);
      startScroll();
    };
    // Runs once: whether the intro plays is decided for the whole session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          id="preloader"
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
          className="fixed inset-0 z-[9000] flex flex-col justify-between bg-bg-deep px-[var(--pad)] py-[1.15rem]"
        >
          <div className="flex items-start justify-between">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SIGNAL }}
              className="display text-[1.5rem] leading-none"
            >
              {profile.monogram}
              <span className="text-accent">.</span>
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE_SIGNAL, delay: 0.1 }}
              className="mono text-faint"
            >
              {profile.location}
            </motion.span>
          </div>

          <div className="flex flex-col gap-6">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE_EXPO, delay: 0.08 }}
                className="display block text-[clamp(1.75rem,6vw,4rem)] leading-[0.95]"
              >
                {roleParts.map((part, i) => (
                  <span key={part}>
                    {i > 0 ? <span className="display-italic text-accent"> &amp; </span> : null}
                    {part}
                  </span>
                ))}
              </motion.span>
            </span>

            <div className="flex items-end justify-between gap-6">
              <span className="mono text-faint">Loading the work</span>
              <motion.span className="mono text-[1rem] tabular-nums text-ink">
                {rounded}
              </motion.span>
            </div>

            <div className="relative h-px w-full bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-accent"
                style={{ scaleX: progress, transformOrigin: "left" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
