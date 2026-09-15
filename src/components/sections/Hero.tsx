"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { ActionLink, ScrollCue } from "@/components/ui/Actions";
import { Halo } from "@/components/ui/Halo";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile, socials } from "@/data/profile";
import { INTRO_DURATION, introWillPlay } from "@/lib/intro";
import { EASE_EXPO, EASE_SIGNAL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

// Canvas work never blocks first paint or ships in the server bundle.
const LightField = dynamic(() => import("@/components/visual/LightField"), {
  ssr: false,
});

const BASE_DELAY = 0.08;

export function Hero() {
  const reduced = usePrefersReducedMotion();

  // Decided once, during the first client render: hold behind the opening
  // sequence when there is one, otherwise start immediately. The delay never
  // reaches the DOM, so this cannot desync from the server render.
  const [delay] = useState(() =>
    introWillPlay() ? INTRO_DURATION - 0.25 + BASE_DELAY : BASE_DELAY,
  );

  // Both branches animate the same properties. `prefers-reduced-motion` only
  // resolves after mount, so a variant that drops `y` partway through would
  // strand the headline mid-slide inside its mask — invisible, permanently.
  const line = {
    hidden: { y: reduced ? "0%" : "112%", opacity: reduced ? 0 : 1 },
    show: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: reduced
        ? { duration: 0.35, delay: 0 }
        : { duration: 1.05, ease: EASE_EXPO, delay: delay + i * 0.1 },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0.35, delay: 0 }
        : { duration: 0.85, ease: EASE_SIGNAL, delay: delay + 0.35 + i * 0.08 },
    }),
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <LightField />

      {/* Atmosphere behind the type, in front of the field. */}
      <Halo tone="b" className="-left-[10%] top-[8%] h-[46vw] w-[46vw] max-w-[620px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-bg to-transparent"
      />

      <div className="shell relative z-[2] flex min-h-[100svh] flex-col pb-8 pt-28 sm:pb-10 lg:pt-32">
        {/* Availability */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
            {profile.availability.open ? <span className="pulse-dot" /> : null}
            <span className="mono text-ink">{profile.availability.label}</span>
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mt-auto flex flex-col gap-8 pt-14 sm:pt-20">
          <h1 id="hero-heading" className="t-hero">
            {profile.headline.map((part, i) => (
              <span
                key={part.text}
                /* The clip box needs room for descenders or it shears them
                   off: Instrument Serif italic's "g" drops 0.22em below the
                   baseline, and at leading 0.88 that fell 8px outside the old
                   0.06em of padding. The negative margin hands the extra space
                   back, so the three-line composition keeps its tight rhythm. */
                className="-mb-[0.12em] block overflow-hidden pb-[0.18em]"
              >
                <motion.span
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className={
                    part.italic
                      ? "display-italic block pr-[0.06em] text-[1.06em] leading-[0.88] text-accent will-change-transform"
                      : "block will-change-transform"
                  }
                >
                  {part.text}
                  {/* Trailing space keeps the h1 readable to screen readers. */}{" "}
                </motion.span>
              </span>
            ))}
          </h1>

          <div className="grid gap-10 border-t border-line pt-8 lg:grid-cols-12 lg:gap-6">
            <motion.p
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="t-body max-w-[46ch] lg:col-span-4"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-start gap-3 lg:col-span-5 lg:col-start-6"
            >
              <ActionLink href="/#work" variant="primary" arrow="s">
                View selected work
              </ActionLink>
              <ActionLink href="/#contact" variant="outline" arrow="ne">
                Let&rsquo;s work together
              </ActionLink>
            </motion.div>

            <motion.dl
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-2 lg:col-span-2 lg:col-start-11 lg:items-end lg:text-right"
            >
              <div className="flex gap-3 lg:flex-col lg:gap-1">
                <dt className="mono text-faint">Based in</dt>
                <dd className="mono text-dim">{profile.location}</dd>
              </div>
              <div className="flex gap-3 lg:flex-col lg:gap-1">
                <dt className="mono text-faint">Local time</dt>
                <dd className="mono text-dim">
                  <LocalTime />
                </dd>
              </div>
            </motion.dl>
          </div>
        </div>

        {/* Footer rail */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="mt-10 flex items-end justify-between gap-6 border-t border-line-faint pt-5"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="link-underline mono text-faint transition-colors duration-300 hover:text-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden sm:block">
            <ScrollCue targetId="work" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
