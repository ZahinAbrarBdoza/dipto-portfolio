"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { navItems } from "@/data/profile";
import { useActiveSection } from "@/lib/hooks";
import { EASE_SIGNAL } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { ActionLink } from "@/components/ui/Actions";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const ids = useMemo(() => navItems.map((item) => item.id), []);
  const active = useActiveSection(ids, isHome);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 48;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const onNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!isHome) return;
      event.preventDefault();
      history.replaceState(null, "", `#${id}`);
      scrollToId(id);
    },
    [isHome],
  );

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_SIGNAL, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled
              ? "border-line bg-bg/72 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent",
          )}
        />

        <div className="shell flex items-center justify-between gap-6 py-[0.95rem]">
          <Wordmark />

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      data-cursor="link"
                      aria-current={isActive ? "true" : undefined}
                      onClick={(event) => onNavClick(event, item.id)}
                      className={cn(
                        "relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.9rem] transition-colors duration-300",
                        isActive ? "text-ink" : "text-dim hover:text-ink",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-full border border-line bg-surface/80"
                          transition={{ duration: 0.5, ease: EASE_SIGNAL }}
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:block">
              <ActionLink
                href="/#contact"
                variant="primary"
                arrow="ne"
                className="px-5 py-2.5 text-[0.875rem]"
              >
                Let&rsquo;s talk
              </ActionLink>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open menu"
              /* after:-inset-1 lifts the 36px disc to a 44px touch target
                 without changing the header's visual rhythm. */
              className="group relative grid h-9 w-9 place-items-center rounded-full border border-line after:absolute after:-inset-1 after:content-[''] lg:hidden"
            >
              <span className="flex h-3 w-4 flex-col justify-between">
                <span className="h-px w-full bg-ink transition-transform duration-300 group-hover:translate-x-[2px]" />
                <span className="h-px w-full bg-ink" />
                <span className="h-px w-full bg-ink transition-transform duration-300 group-hover:-translate-x-[2px]" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
