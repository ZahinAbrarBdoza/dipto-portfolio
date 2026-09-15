"use client";

import { motion } from "framer-motion";
import { MaskLine } from "@/components/ui/AnimatedText";
import { Halo } from "@/components/ui/Halo";
import { testimonials } from "@/data/practice";
import { EASE_EXPO, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data/types";

function Attribution({ item, className }: { item: Testimonial; className?: string }) {
  return (
    <figcaption className={cn("flex items-center gap-3", className)}>
      <span aria-hidden className="h-px w-6 flex-none bg-accent" />
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[0.9rem] text-ink">{item.name}</span>
        <span className="mono text-faint">
          {item.title}, {item.company}
        </span>
      </span>
    </figcaption>
  );
}

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  // Nothing to show until there are real quotes — see the note in practice.ts.
  if (!lead) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section relative"
    >
      <Halo tone="b" className="left-[8%] top-[22%] h-[38vw] w-[38vw] max-w-[480px]" />

      <div className="shell relative">
        <div className="flex items-center gap-4">
          <span className="mono text-accent">06</span>
          <span className="eyebrow">In their words</span>
        </div>

        <h2 id="testimonials-heading" className="sr-only">
          Client testimonials
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-6">
          {lead ? (
            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE_EXPO }}
              className="flex flex-col gap-8 lg:col-span-7"
            >
              <blockquote className="display text-[clamp(1.6rem,3.4vw,2.7rem)] leading-[1.18] text-ink">
                <MaskLine index={0}>
                  <span aria-hidden className="text-accent">
                    &ldquo;
                  </span>
                  {lead.quote.split(".")[0]}.
                </MaskLine>
                <span className="mt-1 block text-dim">
                  {lead.quote.split(".").slice(1).join(".").trim()}
                  <span aria-hidden className="text-accent">
                    &rdquo;
                  </span>
                </span>
              </blockquote>
              <Attribution item={lead} />
            </motion.figure>
          ) : null}

          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9 lg:justify-end">
            {rest.map((item, i) => (
              <motion.figure
                key={item.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="flex flex-col gap-4 border-t border-line pt-6"
              >
                <blockquote className="t-body text-ink">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <Attribution item={item} />
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
