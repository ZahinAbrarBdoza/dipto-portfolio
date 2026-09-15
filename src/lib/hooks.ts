"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query. Returns `false` until mounted so markup matches. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True only for real pointers — gates the custom cursor and pointer parallax. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/**
 * Tracks which section owns the reading band so the nav indicator can follow.
 * Uses a narrow band across the upper third rather than full intersection,
 * which keeps short sections from being skipped.
 *
 * Returns "" when no section owns the band — which is the correct answer at the
 * top of the page, where the hero is not a nav target and nothing should read
 * as current. Starting at ids[0] instead would light up the first nav item
 * while the visitor is still looking at the hero.
 */
export function useActiveSection(ids: string[], enabled = true): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) {
      setActive("");
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    // Keep every section's latest ratio, not just the ones in this callback:
    // entries only carry what changed, so picking a winner needs the full set.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return active;
}

/** Pauses expensive work (canvas loops) while the element is off-screen. */
export function useInViewport<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "200px",
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

/** True while the tab is hidden — lets animation loops idle in the background. */
export function useDocumentHidden(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onChange = () => setHidden(document.hidden);
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return hidden;
}
