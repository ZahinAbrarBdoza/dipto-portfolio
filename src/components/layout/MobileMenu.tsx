"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ActionLink } from "@/components/ui/Actions";
import { Halo } from "@/components/ui/Halo";
import { navItems, profile, socials } from "@/data/profile";
import { EASE_EXPO, EASE_SIGNAL } from "@/lib/motion";
import { scrollToId, startScroll, stopScroll } from "@/lib/scroll";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    stopScroll();

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep tabbing inside the sheet while it owns the screen.
      const items = focusables();
      if (!items.length) return;
      const first = items[0] as HTMLElement;
      const last = items[items.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      startScroll();
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    // Let the sheet finish leaving before the page moves under it.
    window.setTimeout(() => scrollToId(id), 240);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: EASE_EXPO }}
          className="fixed inset-0 z-[70] flex flex-col bg-bg-deep lg:hidden"
        >
          <Halo className="-right-[15%] -top-[10%] h-[60vw] w-[60vw] max-w-[420px]" />

          <div className="flex items-center justify-between px-[var(--pad)] pb-6 pt-[1.15rem]">
            <span className="mono text-faint">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-2.5 text-ink"
              aria-label="Close menu"
            >
              <span className="mono text-faint transition-colors group-hover:text-ink">
                Close
              </span>
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-line">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center px-[var(--pad)]">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-line-faint">
                  <motion.button
                    type="button"
                    onClick={() => go(item.id)}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.66,
                      ease: EASE_EXPO,
                      delay: 0.14 + i * 0.06,
                    }}
                    className="flex w-full items-baseline justify-between py-[0.7rem] text-left"
                  >
                    <span className="t-title">{item.label}</span>
                    <span className="mono text-faint">0{i + 1}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_SIGNAL, delay: 0.42 }}
            className="relative flex flex-col gap-5 px-[var(--pad)] pb-[max(1.75rem,env(safe-area-inset-bottom))]"
          >
            {/* The nav's "Let's talk" is desktop-only, so the sheet carries it. */}
            <ActionLink
              href="/#contact"
              variant="primary"
              arrow="ne"
              magnetic={false}
              className="w-full justify-center"
              onClick={() => go("contact")}
            >
              Let&rsquo;s talk
            </ActionLink>

            <a
              href={`mailto:${profile.email}`}
              className="link-underline t-body text-ink"
              onClick={onClose}
            >
              {profile.email}
            </a>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socials.map((social) => (
                <li key={social.key}>
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-faint transition-colors hover:text-ink"
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
