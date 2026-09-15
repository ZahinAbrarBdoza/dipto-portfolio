"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { damp } from "@/lib/utils";

type CursorMode = "default" | "link" | "view" | "text";

/**
 * A two-part cursor: a hard dot that tracks exactly, and a damped ring that
 * chases it. State comes from `data-cursor` attributes on the elements
 * themselves via delegation — no context, no re-renders, no prop drilling.
 *
 * Disabled entirely on touch devices and under reduced-motion, where the
 * native cursor is the accessible choice.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;

    root.setAttribute("data-cursor", "custom");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let last = performance.now();
    let frame = 0;
    let mode: CursorMode = "default";

    const setMode = (next: CursorMode, text: string) => {
      if (next === mode && label.textContent === text) return;
      mode = next;
      ring.dataset.mode = next;
      label.textContent = text;
      targetScale = next === "view" ? 3.4 : next === "link" ? 1.75 : 1;
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        ringX = targetX;
        ringY = targetY;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }

      const el = (event.target as Element | null)?.closest?.("[data-cursor]");
      const attr = el?.getAttribute("data-cursor");

      if (attr === "view") setMode("view", el?.getAttribute("data-cursor-label") ?? "View");
      else if (attr === "link") setMode("link", "");
      else if (attr === "text") setMode("text", "");
      else setMode("default", "");
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onDown = () => {
      ring.dataset.pressed = "true";
    };
    const onUp = () => {
      ring.dataset.pressed = "false";
    };

    const render = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ringX = damp(ringX, targetX, 14, dt);
      ringY = damp(ringY, targetY, 14, dt);
      scale = damp(scale, targetScale, 12, dt);

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.removeAttribute("data-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        data-mode="default"
        className="cursor-ring pointer-events-none fixed left-0 top-0 grid h-10 w-10 place-items-center rounded-full opacity-0"
      >
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 h-[5px] w-[5px] rounded-full opacity-0"
      />
    </div>
  );
}
