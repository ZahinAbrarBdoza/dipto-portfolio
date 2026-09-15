"use client";

import { motion } from "framer-motion";
import { MaskLine } from "@/components/ui/AnimatedText";
import { skillClusters } from "@/data/practice";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

export function Toolkit() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-heading" className="section relative">
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="flex items-center gap-4">
              <span className="mono text-accent">05</span>
              <span className="eyebrow">Toolkit</span>
            </div>
            <h2 id="toolkit-heading" className="t-section">
              <MaskLine index={0}>Tools are</MaskLine>
              <MaskLine index={1}>
                <span className="display-italic text-accent">not</span> the method
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
            Listed because people ask. What matters is which one gets picked up, and
            when it gets put down.
          </motion.p>
        </header>

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-6 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {skillClusters.map((cluster, i) => (
            <motion.div key={cluster.title} variants={fadeUp} className="flex flex-col gap-5">
              <div className="flex items-baseline gap-3">
                <span className="mono text-accent">0{i + 1}</span>
                <h3 className="text-[1.05rem] font-medium tracking-[-0.015em] text-ink">
                  {cluster.title}
                </h3>
              </div>
              <ul className="flex flex-col">
                {cluster.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 border-b border-line-faint py-2.5 last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className="h-[3px] w-[3px] flex-none rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-accent"
                    />
                    <span className="text-[0.9rem] text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink motion-reduce:group-hover:translate-x-0">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
