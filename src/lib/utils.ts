export type ClassValue = string | number | false | null | undefined;

/** Minimal class joiner — no dependency needed for the few merges we do. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Frame-rate independent damping, used by the cursor and the light field. */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
