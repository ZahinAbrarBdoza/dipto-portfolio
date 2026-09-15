import { cn } from "@/lib/utils";

/**
 * An atmospheric glow, clipped to its section.
 *
 * The clipping layer is not optional. A blurred halo positioned past the edge
 * of its section widens the document, and on mobile a wider document expands
 * the initial containing block — which stretches every `position: fixed`
 * element, pushing the nav's menu button off the side of the screen. Clipping
 * here keeps the effect and removes the side effect, without putting
 * `overflow` on the sections themselves (which carry sticky children).
 */
export function Halo({
  className,
  tone = "a",
}: {
  /** Position and size utilities for the glow itself. */
  className?: string;
  tone?: "a" | "b";
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={cn("halo", className)}
        style={{ background: tone === "a" ? "var(--halo-a)" : "var(--halo-b)" }}
      />
    </div>
  );
}
