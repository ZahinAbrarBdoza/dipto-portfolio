"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { EASE_SIGNAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Copies the address and says so — in the button, and to screen readers via a
 * live region. Falls back to selecting nothing and simply reporting failure if
 * the clipboard is unavailable, since the address is also a link beside it.
 */
export function CopyEmail({ className }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2400);
  };

  const label =
    state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <a
        href={`mailto:${profile.email}`}
        data-cursor="link"
        className="link-underline display text-[clamp(1.15rem,2.6vw,1.85rem)] text-ink"
      >
        {profile.email}
      </a>

      <button
        type="button"
        onClick={copy}
        data-cursor="link"
        className="group relative inline-flex h-8 items-center gap-2 overflow-hidden rounded-full border border-line px-3.5 transition-colors duration-300 hover:border-accent"
      >
        <span className="mono text-faint transition-colors duration-300 group-hover:text-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={label}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE_SIGNAL }}
              className="block"
            >
              {label}
            </motion.span>
          </AnimatePresence>
        </span>
        <motion.span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full"
          animate={{
            backgroundColor:
              state === "copied"
                ? "var(--accent)"
                : state === "failed"
                  ? "var(--ink-faint)"
                  : "var(--line-strong)",
            scale: state === "copied" ? 1.25 : 1,
          }}
          transition={{ duration: 0.35, ease: EASE_SIGNAL }}
        />
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? `${profile.email} copied to clipboard`
          : state === "failed"
            ? "Could not copy the address. Use the email link instead."
            : ""}
      </span>
    </div>
  );
}
