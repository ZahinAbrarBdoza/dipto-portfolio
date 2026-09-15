"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Counter } from "@/components/ui/Actions";
import { MaskLine } from "@/components/ui/AnimatedText";
import { Halo } from "@/components/ui/Halo";
import { Portrait } from "@/components/visual/Portrait";
import { clients, profile, stats } from "@/data/profile";
import { EASE_EXPO, fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function About() {
  const [marqueePaused, setMarqueePaused] = useState(false);

  return (
    <section id="about" aria-labelledby="about-heading" className="section relative">
      <Halo className="right-[-12%] top-[12%] h-[42vw] w-[42vw] max-w-[560px]" />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          {/* Plate */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_EXPO }}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          >
            <div className="media-frame overflow-hidden rounded-[3px] border border-line bg-surface">
              <Portrait className="aspect-[4/5] w-full object-cover" />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-line-faint pt-3">
              <span className="mono text-ink">{profile.fullName}</span>
              {/* Right-aligned so a wrapped role still sits flush to the plate edge. */}
              <span className="mono text-right text-faint">{profile.role}</span>
            </figcaption>
          </motion.figure>

          {/* Narrative */}
          <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="mono text-accent">02</span>
                <span className="eyebrow">About</span>
              </div>
              <h2 id="about-heading" className="t-section">
                <MaskLine index={0}>A number nobody</MaskLine>
                <MaskLine index={1}>
                  <span className="display-italic text-accent">trusts</span> is noise.
                </MaskLine>
              </h2>
            </div>

            <motion.div
              variants={stagger(0.09)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-5"
            >
              {profile.bio.map((paragraph) => (
                <motion.p key={paragraph.slice(0, 24)} variants={fadeUp} className="t-body">
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* Philosophy pull quote */}
            <motion.blockquote
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="relative border-l border-accent pl-6"
            >
              <p className="display text-[clamp(1.35rem,2.4vw,1.9rem)] leading-[1.25] text-ink">
                &ldquo;Most reporting problems are{" "}
                <span className="display-italic text-accent">not analysis problems</span>{" "}
                but collection problems — and the fix is usually a script, a validation
                check and a note on how it works.&rdquo;
              </p>
            </motion.blockquote>

            <motion.dl
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="flex flex-col gap-1.5">
                  <dt className="display text-[clamp(2rem,4vw,2.75rem)] leading-none text-ink">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix ?? ""}
                    />
                  </dt>
                  <dd className="mono text-faint">{stat.label}</dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="flex flex-col gap-3 border-t border-line pt-8"
            >
              <span className="eyebrow">Currently</span>
              <p className="t-lead max-w-[52ch] text-ink">{profile.currentFocus}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Where I have worked and studied — the only marquee on the site.
          It moves on its own for more than five seconds, so WCAG 2.2.2 needs a
          real control: hover alone is unreachable by keyboard and touch. */}
      <div
        data-paused={marqueePaused}
        className="marquee edge-fade-x relative mt-24 overflow-hidden border-y border-line py-5 sm:mt-32"
      >
        <div className="marquee-track [--marquee-duration:52s]" aria-hidden>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {clients.map((client) => (
                <li
                  key={`${copy}-${client}`}
                  className="flex items-center gap-10 whitespace-nowrap px-10"
                >
                  <span className="display text-[clamp(1.25rem,2.2vw,1.75rem)] text-dim transition-colors duration-500 hover:text-ink">
                    {client}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <p className="sr-only">
          Where I have worked and studied: {clients.join(", ")}.
        </p>

        <button
          type="button"
          onClick={() => setMarqueePaused((p) => !p)}
          data-cursor="link"
          aria-pressed={marqueePaused}
          className="absolute right-3 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur-sm transition-colors duration-300 hover:border-accent"
        >
          <span className="sr-only">
            {marqueePaused ? "Resume scrolling list" : "Pause scrolling list"}
          </span>
          <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden fill="currentColor">
            {marqueePaused ? (
              <path d="M3 1.5l7 4.5-7 4.5z" />
            ) : (
              <>
                <rect x="3" y="1.5" width="2.5" height="9" rx="0.5" />
                <rect x="6.5" y="1.5" width="2.5" height="9" rx="0.5" />
              </>
            )}
          </svg>
        </button>
      </div>
    </section>
  );
}
