"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MaskLine } from "@/components/ui/AnimatedText";
import { services } from "@/data/practice";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_EXPO, EASE_SIGNAL, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Expertise() {
  const [open, setOpen] = useState<string>(services[0]?.index ?? "01");
  const reduced = usePrefersReducedMotion();

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="section relative">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-6">
        <header className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-4">
            <span className="mono text-accent">03</span>
            <span className="eyebrow">Expertise</span>
          </div>
          <h2 id="expertise-heading" className="t-section">
            <MaskLine index={0}>What I</MaskLine>
            <MaskLine index={1}>
              <span className="display-italic text-accent">actually</span> do
            </MaskLine>
          </h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="t-body max-w-[36ch]"
          >
            The tools are ordinary: SQL, Python, spreadsheets, dashboards. What matters
            is what they are pointed at.
          </motion.p>
        </header>

        <div className="lg:col-span-7 lg:col-start-6">
          <h3 className="sr-only">Services</h3>
          <ul className="border-t border-line">
            {services.map((service, i) => {
              const expanded = open === service.index;
              const panelId = `service-panel-${service.index}`;
              const buttonId = `service-button-${service.index}`;

              return (
                <motion.li
                  key={service.index}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="group border-b border-line"
                >
                  <h4>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      data-cursor="link"
                      onClick={() => setOpen(expanded ? "" : service.index)}
                      className="flex w-full items-baseline gap-5 py-6 text-left sm:gap-8"
                    >
                      <span
                        className={cn(
                          "mono flex-none transition-colors duration-500",
                          expanded ? "text-accent" : "text-faint group-hover:text-dim",
                        )}
                      >
                        {service.index}
                      </span>{" "}
                      <span
                        className={cn(
                          "t-title flex-1 transition-colors duration-500",
                          expanded ? "text-ink" : "text-dim group-hover:text-ink",
                        )}
                      >
                        {service.title}
                      </span>
                      <span
                        aria-hidden
                        className="relative grid h-6 w-6 flex-none place-items-center"
                      >
                        <span className="absolute h-px w-4 bg-current transition-colors duration-500" />
                        <motion.span
                          className="absolute h-4 w-px bg-current"
                          initial={false}
                          animate={{ scaleY: expanded ? 0 : 1, rotate: expanded ? 90 : 0 }}
                          transition={{ duration: 0.45, ease: EASE_SIGNAL }}
                        />
                      </span>
                    </button>
                  </h4>

                  <AnimatePresence initial={false}>
                    {expanded ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: reduced ? 0 : 0.55, ease: EASE_EXPO },
                          opacity: { duration: reduced ? 0 : 0.35, ease: EASE_SIGNAL },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pb-8 pl-[3.2rem] pr-2 sm:pl-[4.4rem]">
                          <p className="t-body max-w-[52ch]">{service.body}</p>
                          <ul className="flex flex-wrap gap-2">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[0.75rem] text-dim"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
