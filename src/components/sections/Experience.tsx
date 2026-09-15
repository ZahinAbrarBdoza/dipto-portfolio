"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { MaskLine } from "@/components/ui/AnimatedText";
import { roles } from "@/data/practice";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_SIGNAL, fadeUp, viewportOnce } from "@/lib/motion";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 72%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const scaleY = useTransform(progress, (v) => (reduced ? 1 : v));

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section relative">
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="mono text-accent">04</span>
              <span className="eyebrow">Experience</span>
            </div>
            <h2 id="experience-heading" className="t-section">
              <MaskLine index={0}>Three teams,</MaskLine>
              <MaskLine index={1}>
                two <span className="display-italic text-accent">sectors</span>
              </MaskLine>
            </h2>
          </div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="t-body max-w-[52ch] self-end lg:col-span-4 lg:col-start-9"
          >
            An internship in fintech, a data operations job handling large datasets, and
            my current work in the development sector.
          </motion.p>
        </header>

        {/* Rule between header and body, as every other numbered section has.
            The spine below is absolutely positioned against the padding box,
            so it starts under the rule rather than crossing it. */}
        <div ref={trackRef} className="relative mt-14 border-t border-line pt-10">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px bg-line sm:left-[7.5rem] lg:left-[11rem]"
          >
            <motion.div
              className="h-full w-full origin-top bg-accent"
              style={{ scaleY }}
            />
          </div>

          <ol className="flex flex-col">
            {roles.map((role, i) => (
              <motion.li
                key={role.company}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE_SIGNAL }}
                /* minmax, not a fixed 8rem and not bare auto. 8rem (128px)
                   broke "AUG 2025 — APR 2026" (~160px) in half; bare auto sizes
                   per row, so each entry's title started at a different x. The
                   floor clears the longest range and holds one shared edge. */
                className="group relative grid gap-x-6 gap-y-4 border-b border-line-faint py-9 pl-8 last:border-b-0 sm:grid-cols-[minmax(10.5rem,auto)_1fr] sm:pl-[10rem] lg:grid-cols-[minmax(10.5rem,auto)_1fr_minmax(0,14rem)] lg:pl-[13.5rem]"
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-0 top-[2.85rem] flex h-[9px] w-[9px] -translate-x-[4px] items-center justify-center rounded-full border border-line-strong bg-bg transition-colors duration-500 group-hover:border-accent sm:left-[7.5rem] lg:left-[11rem]"
                >
                  <span className="h-[3px] w-[3px] rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </span>

                <div className="flex flex-col gap-1 sm:col-start-1 lg:col-start-1">
                  <span className="mono whitespace-nowrap text-ink">{role.period}</span>
                  <span className="mono text-faint">{role.location}</span>
                </div>

                <div className="flex flex-col gap-3 sm:col-start-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="t-title">{role.company}</h3>
                    <p className="text-[0.95rem] text-accent">{role.position}</p>
                  </div>
                  <p className="t-body max-w-[50ch]">{role.summary}</p>
                  <p className="flex gap-3 text-[0.9rem] leading-relaxed text-ink">
                    <span aria-hidden className="mt-[0.55em] h-px w-5 flex-none bg-accent" />
                    <span>{role.achievement}</span>
                  </p>
                </div>

                {/* items-start, or each pill stretches to the row height and
                    rounded-full turns it into an ellipse. */}
                <ul className="flex flex-wrap items-start gap-1.5 self-start sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:justify-end">
                  {role.disciplines.map((discipline) => (
                    <li
                      key={discipline}
                      className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-dim"
                    >
                      {discipline}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
