"use client";

import { useEffect, useRef } from "react";
import {
  useDocumentHidden,
  useFinePointer,
  useInViewport,
  usePrefersReducedMotion,
} from "@/lib/hooks";
import { damp } from "@/lib/utils";

/* ══════════════════════════════════════════════════════════════════════════
   The one interactive visual in the site.

   A field of hairline segments on a perspective grid. Each segment turns to
   face the pointer and brightens inside a falloff radius, so moving the mouse
   sweeps a beam of light across an instrument panel. With no pointer it drifts
   on a slow ambient wave.

   Costs one canvas and one rAF. It stops when scrolled out of view or the tab
   is hidden, renders a single static frame on touch devices, and falls back to
   a pure CSS gradient under reduced motion.
   ══════════════════════════════════════════════════════════════════════════ */

interface Segment {
  x: number;
  y: number;
  angle: number;
  len: number;
  depth: number;
}

function readColors() {
  const styles = getComputedStyle(document.documentElement);
  const strength = Number.parseFloat(styles.getPropertyValue("--field-strength"));
  return {
    ink: styles.getPropertyValue("--ink").trim() || "#f4f1ea",
    accent: styles.getPropertyValue("--accent").trim() || "#ff6a3d",
    strength: Number.isFinite(strength) ? strength : 1,
  };
}

export default function LightField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const hidden = useDocumentHidden();
  const inView = useInViewport(wrapRef, "120px");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let segments: Segment[] = [];
    let colors = readColors();

    // Pointer target, damped toward by the light source.
    let px = -9999;
    let py = -9999;
    let lx = px;
    let ly = py;
    let intensity = 0;
    let targetIntensity = 0;
    let time = 0;
    let last = performance.now();
    let frame = 0;
    let running = false;

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Density scales with area but is capped so phones stay cheap.
      const target = Math.min(1150, Math.round((width * height) / 2400));
      const cols = Math.max(6, Math.round(Math.sqrt(target * (width / height))));
      const rows = Math.max(4, Math.round(target / cols));
      const gapX = width / cols;
      const gapY = height / rows;

      segments = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          // Depth fades the field toward the top — a horizon, not a wallpaper.
          const depth = 0.25 + (r / rows) * 0.75;
          segments.push({
            x: gapX * (c + 0.5) + (r % 2 ? gapX * 0.25 : 0),
            y: gapY * (r + 0.5),
            angle: -0.6 + Math.sin(r * 0.5 + c * 0.3) * 0.4,
            len: 5 + depth * 10,
            depth,
          });
        }
      }
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      lx = damp(lx, px, 6, dt);
      ly = damp(ly, py, 6, dt);
      intensity = damp(intensity, targetIntensity, 4, dt);

      const reach = Math.min(width, height) * 0.62;

      // Ember halo under the field.
      if (intensity > 0.01) {
        const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, reach * 0.85);
        glow.addColorStop(0, colors.accent);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.1 * intensity;
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
      }

      ctx.lineCap = "round";

      for (let i = 0; i < segments.length; i += 1) {
        const s = segments[i] as Segment;
        const dx = lx - s.x;
        const dy = ly - s.y;
        const dist = Math.hypot(dx, dy);
        const near = Math.max(0, 1 - dist / reach) * intensity;

        // Ambient drift keeps the field alive without a pointer.
        const ambient = Math.sin(s.x * 0.006 + s.y * 0.004 + time * 0.35) * 0.55 - 0.6;
        const toPointer = Math.atan2(dy, dx);
        const target = ambient * (1 - near) + toPointer * near;

        // Shortest-path interpolation so segments never spin the long way.
        let delta = target - s.angle;
        while (delta > Math.PI) delta -= Math.PI * 2;
        while (delta < -Math.PI) delta += Math.PI * 2;
        s.angle += delta * Math.min(1, dt * (2.5 + near * 6));

        const len = s.len * (1 + near * 0.85);
        const cos = Math.cos(s.angle) * len;
        const sin = Math.sin(s.angle) * len;

        // Ambient floor is high enough that the field reads before anyone
        // moves a pointer, low enough that it never competes with the type.
        const base = 0.1 + s.depth * 0.16;
        const alpha = (base + near * near * 0.7) * colors.strength;

        ctx.strokeStyle = near > 0.22 ? colors.accent : colors.ink;
        ctx.globalAlpha = Math.min(0.92, alpha);
        ctx.lineWidth = 1 + near * 0.9;
        ctx.beginPath();
        ctx.moveTo(s.x - cos * 0.5, s.y - sin * 0.5);
        ctx.lineTo(s.x + cos * 0.5, s.y + sin * 0.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      draw(dt);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
      targetIntensity = 1;
    };

    const onPointerLeave = () => {
      targetIntensity = 0;
    };

    const observer = new ResizeObserver(() => {
      build();
      if (!running) draw(0.016);
    });
    observer.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (!running) draw(0.016);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    build();

    if (fine) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      if (inView && !hidden) start();
      else draw(0.016);
    } else {
      // Touch: one static frame, lit from the upper right. No loop, no cost.
      px = width * 0.78;
      py = height * 0.3;
      lx = px;
      ly = py;
      intensity = 0.85;
      targetIntensity = 0.85;
      draw(0.016);
    }

    return () => {
      stop();
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduced, fine, inView, hidden]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="field-mask absolute inset-0 h-full w-full"
    >
      {reduced ? (
        <div
          className="h-full w-full opacity-70"
          style={{
            background:
              "radial-gradient(60% 55% at 65% 40%, var(--accent-glow), transparent 70%), radial-gradient(45% 45% at 25% 75%, var(--halo-b), transparent 70%)",
          }}
        />
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" />
      )}
    </div>
  );
}
