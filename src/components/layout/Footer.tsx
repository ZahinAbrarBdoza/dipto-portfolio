"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LocalTime } from "@/components/ui/LocalTime";
import { Arrow } from "@/components/ui/Actions";
import { navItems, profile, socials } from "@/data/profile";
import { EASE_EXPO, viewportOnce } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="shell flex flex-col gap-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <span className="mono text-faint">Index</span>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    data-cursor="link"
                    onClick={(event) => {
                      if (window.location.pathname === "/") {
                        event.preventDefault();
                        history.replaceState(null, "", `#${item.id}`);
                        scrollToId(item.id);
                      }
                    }}
                    className="link-underline text-[0.95rem] text-dim transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            <span className="mono text-faint">Elsewhere</span>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="link-underline text-[0.95rem] text-dim transition-colors duration-300 hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-3 lg:col-start-10">
            <span className="mono text-faint">Say hello</span>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="link"
              className="link-underline w-fit text-[0.95rem] text-ink"
            >
              {profile.email}
            </a>
            <p className="mono text-faint">
              <LocalTime /> · {profile.location}
            </p>
            {/* Same string the hero badge shows — one source of truth for the
                availability signal, so the two can never contradict. */}
            <p className="flex items-start gap-2 text-[0.85rem] text-dim">
              {profile.availability.open ? (
                <span className="pulse-dot mt-[0.45em]" />
              ) : null}
              {profile.availability.label}
            </p>
          </div>
        </div>

        {/* The mark, at full width. Lights up as it enters. */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
          className="group/mark relative select-none pt-6"
          aria-hidden
        >
          <span className="display block text-center text-[clamp(4.5rem,20vw,17rem)] leading-[0.8] tracking-[-0.045em] text-ink/[0.14] transition-colors duration-700 group-hover/mark:text-ink/[0.22]">
            {profile.name}
            <span className="text-accent/60">.</span>
          </span>
        </motion.div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-faint">
            © {year} {profile.fullName} — All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <p className="mono text-faint">Built with Next.js, Tailwind &amp; care</p>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              data-cursor="link"
              className="group inline-flex items-center gap-2 text-faint transition-colors duration-300 hover:text-ink"
            >
              <span className="mono">Back to top</span>
              <span className="grid h-7 w-7 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-accent">
                <Arrow
                  dir="e"
                  className="h-3 w-3 -rotate-90 transition-transform duration-500 group-hover:-translate-y-[2px]"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
