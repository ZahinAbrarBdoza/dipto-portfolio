"use client";

/** Minimal surface of the Lenis instance we depend on. */
export interface LenisLike {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean },
  ) => void;
  raf: (time: number) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
}

let instance: LenisLike | null = null;

export function setLenis(next: LenisLike | null): void {
  instance = next;
}

export function getLenis(): LenisLike | null {
  return instance;
}

/**
 * Scrolls to an in-page target. Falls back to native behaviour whenever Lenis
 * is not running (reduced motion, touch devices, JS-degraded states).
 *
 * Nav clearance comes from `scroll-margin-top` on the sections themselves, and
 * Lenis honours it — so the default offset here is 0. Passing one adds a second
 * 72px on top and every jump lands a nav-height too high.
 */
export function scrollToId(id: string, offset = 0): void {
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset });
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export function stopScroll(): void {
  getLenis()?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function startScroll(): void {
  getLenis()?.start();
  document.documentElement.style.overflow = "";
}
