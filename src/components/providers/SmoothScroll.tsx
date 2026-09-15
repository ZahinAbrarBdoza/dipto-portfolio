"use client";

import { useEffect } from "react";
import { setLenis, type LenisLike } from "@/lib/scroll";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Lenis, but only where it earns its keep: desktop pointers with motion
 * enabled. Touch devices keep native momentum scrolling (Lenis makes it worse,
 * not better) and reduced-motion users keep the browser's own scroll entirely.
 */
export function SmoothScroll() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    let lenis: (LenisLike & { destroy: () => void }) | null = null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
      }) as unknown as LenisLike & { destroy: () => void };

      setLenis(lenis);

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
      setLenis(null);
    };
  }, [enabled]);

  return null;
}
