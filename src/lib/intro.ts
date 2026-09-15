"use client";

export const INTRO_KEY = "qs-intro-played";

/** How long the opening sequence holds the screen, in seconds. */
export const INTRO_DURATION = 1.15;

/**
 * Whether the opening sequence should play for this visit. Answered
 * synchronously so the hero can pick its own entrance delay during its first
 * client render, instead of waiting to be told by another component.
 *
 * Deliberately not a shared piece of state: if a timer, a storage exception or
 * a render error ever stopped that message arriving, the hero would stay blank
 * — and the hero going blank is the worst failure this site could have.
 */
export function introWillPlay(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    // Storage blocked: treat it as a repeat visit and skip the sequence.
    return false;
  }
}

export function markIntroPlayed(): void {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* nothing to persist to — the sequence simply plays again */
  }
}
