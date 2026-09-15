"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMounted } from "@/lib/hooks";
import { EASE_SIGNAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * One icon, not two: a disc that slides a mask across itself to become a
 * crescent. The transition is the mechanism, so it reads as a single object
 * changing state rather than two icons swapping.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const mounted = useMounted();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={mounted ? !isDark : undefined}
      className={cn(
        "group relative grid h-9 w-9 place-items-center rounded-full border border-line text-ink",
        // 36px disc, 44px touch target.
        "after:absolute after:-inset-1 after:content-['']",
        "transition-colors duration-300 hover:border-line-strong hover:bg-surface",
        className,
      )}
    >
      {/* The icon shows the action, not the current state: a sun while the
          site is dark (tap to go light), a crescent while it is light. That
          matches what the aria-label announces. */}
      <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden>
        <mask id="theme-mask">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <motion.circle
            cx="24"
            cy="10"
            r="8"
            fill="black"
            initial={false}
            animate={{ cx: isDark ? 30 : 17, cy: isDark ? 2 : 7 }}
            transition={{ duration: 0.6, ease: EASE_SIGNAL }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-mask)"
          initial={false}
          animate={{ r: isDark ? 5.5 : 7.5 }}
          transition={{ duration: 0.6, ease: EASE_SIGNAL }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : -45 }}
          transition={{ duration: 0.6, ease: EASE_SIGNAL }}
          style={{ transformOrigin: "12px 12px" }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="12"
              y1="1.6"
              x2="12"
              y2="3.4"
              transform={`rotate(${deg} 12 12)`}
            />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}
