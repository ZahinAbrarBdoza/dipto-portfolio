"use client";

import { motion } from "framer-motion";
import { MaskLine } from "@/components/ui/AnimatedText";
import { Halo } from "@/components/ui/Halo";
import { activities, certifications, education } from "@/data/practice";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Credentials() {
  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="section relative"
    >
      <Halo tone="b" className="left-[6%] top-[18%] h-[38vw] w-[38vw] max-w-[480px]" />

      <div className="shell relative">
        <header className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="mono text-accent">06</span>
              <span className="eyebrow">Credentials</span>
            </div>
            <h2 id="credentials-heading" className="t-section">
              <MaskLine index={0}>Studied,</MaskLine>
              <MaskLine index={1}>
                <span className="display-italic text-accent">and still</span> studying
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
            A computer science degree, an MBA in progress, and the clubs that taught me
            how to talk to people who do not read SQL.
          </motion.p>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-6">
          {/* Education */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <h3 className="mono mb-6 text-faint">Education</h3>
            <ol className="flex flex-col">
              {education.map((item) => (
                <motion.li
                  key={item.qualification}
                  variants={fadeUp}
                  className="group flex flex-col gap-2 border-b border-line-faint py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[1.05rem] font-medium tracking-[-0.015em] text-ink">
                      {item.qualification}
                    </span>
                    <span className="text-[0.9rem] text-dim">{item.institution}</span>
                  </div>
                  <div className="flex flex-none items-baseline gap-4 sm:flex-col sm:items-end sm:gap-1">
                    <span className="mono text-dim">{item.period}</span>
                    <span className="mono text-accent">{item.note}</span>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Certification + activities */}
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9"
          >
            {certifications.length ? (
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <h3 className="mono text-faint">Certification</h3>
                <ul className="flex flex-wrap gap-2">
                  {certifications.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[0.8rem] text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <h3 className="mono text-faint">Beyond the desk</h3>
              <ul className="flex flex-col">
                {activities.map((item) => (
                  <li
                    key={item.role}
                    className="flex flex-col gap-0.5 border-b border-line-faint py-3 last:border-b-0"
                  >
                    <span className="text-[0.9rem] text-ink">{item.role}</span>
                    <span className="mono text-faint">{item.org}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
