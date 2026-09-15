"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useRef, type PointerEvent } from "react";
import { ProjectVisual } from "@/components/visual/ProjectVisual";
import { MaskLine } from "@/components/ui/AnimatedText";
import { Arrow } from "@/components/ui/Actions";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_EXPO, EASE_SIGNAL, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ── Editorial layout plan ───────────────────────────────────────────────
   Deliberately not a uniform grid: a full-width opener, then alternating
   asymmetric pairs with varied proportions and vertical offsets.
   ──────────────────────────────────────────────────────────────────────── */

interface Layout {
  media: string;
  meta: string;
  aspect: string;
  offset: string;
  full?: boolean;
}

const LAYOUTS: Layout[] = [
  {
    media: "lg:col-span-12",
    meta: "lg:col-span-12",
    aspect: "aspect-[16/10] sm:aspect-[2/1]",
    offset: "",
    full: true,
  },
  {
    media: "lg:col-span-7 lg:col-start-1",
    meta: "lg:col-span-4 lg:col-start-9",
    aspect: "aspect-[4/3]",
    offset: "lg:mt-16",
  },
  {
    media: "lg:col-span-7 lg:col-start-6 lg:order-2",
    meta: "lg:col-span-4 lg:col-start-1 lg:order-1",
    aspect: "aspect-[3/2]",
    offset: "",
  },
  {
    media: "lg:col-span-6 lg:col-start-2",
    meta: "lg:col-span-4 lg:col-start-9",
    aspect: "aspect-[5/6] sm:aspect-[4/3]",
    offset: "lg:mt-24",
  },
  {
    media: "lg:col-span-8 lg:col-start-5 lg:order-2",
    meta: "lg:col-span-4 lg:col-start-1 lg:order-1",
    aspect: "aspect-[16/10]",
    offset: "",
  },
  {
    media: "lg:col-span-6 lg:col-start-1",
    meta: "lg:col-span-4 lg:col-start-8",
    aspect: "aspect-[4/3]",
    offset: "lg:mt-8",
  },
];

/* ── Media ──────────────────────────────────────────────────────────────── */

function ProjectMedia({
  project,
  index,
  aspect,
}: {
  project: Project;
  index: number;
  aspect: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const tilt = fine && !reduced;

  const onMove = useCallback(
    (event: PointerEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!tilt || !el) return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--ry", `${px * 5}deg`);
      el.style.setProperty("--rx", `${-py * 4}deg`);
    },
    [tilt],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  }, []);

  return (
    // Same properties in both branches — see the note in MaskLine.
    <motion.div
      initial={{ clipPath: reduced ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: reduced ? 0.3 : 1.15, ease: EASE_EXPO }}
      className="will-change-[clip-path]"
    >
      <Link
        ref={ref}
        href={`/work/${project.slug}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor="view"
        data-cursor-label="Case study"
        aria-label={`${project.name} case study — ${project.summary}`}
        className={cn(
          "media-frame tilt group/media relative block w-full overflow-hidden rounded-[3px] border border-line bg-surface",
          aspect,
        )}
      >
        <ProjectVisual
          variant={project.art}
          accent={project.accent}
          seed={project.slug}
          label={project.name}
        />

        {/* Index plate */}
        <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-bg/55 px-3 py-1.5 backdrop-blur-md sm:left-6 sm:top-6">
          <span className="mono text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="mono text-dim">{project.year}</span>
        </span>

        {/* Touch affordance — hover is never the only route in. */}
        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-line bg-bg/55 px-3.5 py-2 backdrop-blur-md transition-colors duration-500 group-hover/media:border-accent sm:bottom-6 sm:right-6">
          <span className="mono text-ink">Case study</span>
          <Arrow className="text-accent" />
        </span>
      </Link>
    </motion.div>
  );
}

/* ── Meta ───────────────────────────────────────────────────────────────── */

function TitleBlock({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="link"
        className="group/title inline-flex w-fit items-center gap-3"
      >
        <h3 className="t-title">{project.name}</h3>
        <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-line text-faint transition-all duration-500 group-hover/title:border-accent group-hover/title:text-accent">
          <Arrow className="h-3 w-3 transition-transform duration-500 group-hover/title:translate-x-[2px] group-hover/title:-translate-y-[2px]" />
        </span>
      </Link>
      <p className="mono text-faint">{project.category}</p>
    </div>
  );
}

function CreditList({ project }: { project: Project }) {
  return (
    <dl className="flex flex-col gap-3 border-t border-line-faint pt-4">
      <div className="flex gap-4">
        <dt className="mono w-14 flex-none pt-[0.15rem] text-faint">Role</dt>
        <dd className="text-[0.875rem] leading-relaxed text-dim">{project.role}</dd>
      </div>
      <div className="flex gap-4">
        <dt className="mono w-14 flex-none pt-[0.35rem] text-faint">Stack</dt>
        <dd className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] tracking-[0.01em] text-dim transition-colors duration-300 hover:border-line-strong hover:text-ink"
            >
              {item}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}

function MetricList({ project, className }: { project: Project; className?: string }) {
  if (!project.metrics.length) return null;
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line-faint pt-4", className)}>
      {project.metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col gap-1">
          <dt className="display text-[1.5rem] leading-none text-ink">{metric.value}</dt>
          <dd className="mono text-faint">{metric.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function ProjectMeta({
  project,
  full,
  className,
}: {
  project: Project;
  full?: boolean;
  className?: string;
}) {
  // Full-width opener: the meta spreads across the page as a contents row.
  if (full) {
    return (
      <div className={cn("grid gap-8 pt-2 lg:grid-cols-12 lg:gap-6", className)}>
        <div className="lg:col-span-4">
          <TitleBlock project={project} />
        </div>
        <div className="flex flex-col gap-5 lg:col-span-4">
          <p className="t-body max-w-[42ch]">{project.summary}</p>
          <CreditList project={project} />
        </div>
        <MetricList project={project} className="lg:col-span-3 lg:col-start-10 lg:border-t-0 lg:pt-0" />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex flex-col gap-5 lg:sticky lg:top-28">
        <TitleBlock project={project} />
        <p className="t-body max-w-[42ch]">{project.summary}</p>
        <CreditList project={project} />
        <MetricList project={project} />
      </div>
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section relative">
      <div className="shell">
        <header className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="mono text-accent">01</span>
              <span className="eyebrow">Selected work</span>
            </div>
            <h2 id="work-heading" className="t-section">
              <MaskLine index={0}>Six projects,</MaskLine>
              <MaskLine index={1}>
                and the <span className="display-italic text-accent">problems</span> behind
                them
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
            Reporting automation, transaction monitoring, database automation, dataset
            governance, and university work in forecasting and web development. Each one
            says what the problem was and what I built.
          </motion.p>
        </header>

        <motion.hr
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE_EXPO }}
          className="rule rule-draw mt-12 sm:mt-16"
        />

        <div className="flex flex-col gap-24 pt-12 sm:gap-32 sm:pt-16 lg:gap-40">
          {projects.map((project, index) => {
            const layout = LAYOUTS[index % LAYOUTS.length] as Layout;
            return (
              <article
                key={project.slug}
                className={cn(
                  "grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-6",
                  layout.offset,
                )}
              >
                <div className={cn("order-1", layout.media)}>
                  <ProjectMedia project={project} index={index} aspect={layout.aspect} />
                </div>
                <ProjectMeta
                  project={project}
                  full={layout.full}
                  className={cn("order-2", layout.meta)}
                />
              </article>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_SIGNAL }}
          className="mt-20 flex flex-wrap items-baseline justify-between gap-6 border-t border-line pt-8 sm:mt-28"
        >
          <p className="t-body max-w-[42ch]">
            Query notebooks, dashboard walkthroughs and code are available on request.
          </p>
          <Link
            href="/#contact"
            data-cursor="link"
            className="link-underline t-title text-ink"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
