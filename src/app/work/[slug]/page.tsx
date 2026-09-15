import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/ui/Actions";
import { MaskLine } from "@/components/ui/AnimatedText";
import { Halo } from "@/components/ui/Halo";
import { CaseReveal } from "@/components/sections/CaseReveal";
import { ProjectVisual } from "@/components/visual/ProjectVisual";
import { profile } from "@/data/profile";
import { getAdjacentProject, getProject, projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  const title = `${project.name} — ${project.category}`;

  return {
    title: `${project.name}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `${profile.siteUrl}/work/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getAdjacentProject(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.summary,
    about: project.category,
    dateCreated: project.year,
    creator: { "@type": "Person", name: profile.fullName, url: profile.siteUrl },
    url: `${profile.siteUrl}/work/${project.slug}`,
    keywords: project.stack.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="shell pb-14 pt-32 sm:pt-40">
        <Link
          href="/#work"
          data-cursor="link"
          className="group mono inline-flex items-center gap-2.5 text-faint transition-colors duration-300 hover:text-ink"
        >
          <Arrow
            dir="e"
            className="h-3 w-3 rotate-180 transition-transform duration-500 group-hover:-translate-x-1"
          />
          All work
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-8">
            <h1 className="t-hero text-[clamp(2.6rem,7.5vw,6.5rem)]">
              <MaskLine index={0} immediate>
                {project.name}
              </MaskLine>
            </h1>
            <p className="t-lead max-w-[52ch] text-ink">{project.intro}</p>
          </div>

          <dl className="flex flex-col gap-5 self-end lg:col-span-3 lg:col-start-10">
            <div className="flex flex-col gap-1 border-t border-line pt-3">
              <dt className="mono text-faint">Discipline</dt>
              <dd className="text-[0.9rem] text-ink">{project.category}</dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-line pt-3">
              <dt className="mono text-faint">Role</dt>
              <dd className="text-[0.9rem] text-ink">{project.role}</dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-line pt-3">
              <dt className="mono text-faint">Year</dt>
              <dd className="text-[0.9rem] text-ink">{project.year}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ── Lead visual ─────────────────────────────────────────────────── */}
      <div className="shell">
        <CaseReveal>
          <div className="media-frame aspect-[16/10] w-full overflow-hidden rounded-[3px] border border-line bg-surface sm:aspect-[2/1]">
            <ProjectVisual
              variant={project.art}
              accent={project.accent}
              seed={`${project.slug}-lead`}
              label={project.name}
            />
          </div>
        </CaseReveal>

        {/* Label in <dt>, value in <dd>, consistently — the Stack cell used to
            be the only one that way round, so the row read value→label three
            times and then label→value. Four cells, so 2 then 4 columns. */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 lg:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-2">
              <dt className="mono text-faint">{metric.label}</dt>
              <dd className="display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.08] text-ink">
                {metric.value}
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <dt className="mono text-faint">Stack</dt>
            <dd className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-dim"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* ── Challenge & strategy ────────────────────────────────────────── */}
      <section aria-labelledby="challenge-heading" className="shell py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="eyebrow">The challenge</span>
            <h2 id="challenge-heading" className="t-title max-w-[18ch]">
              What was actually wrong
            </h2>
          </div>
          <p className="t-body max-w-[58ch] text-[1.05rem] lg:col-span-6 lg:col-start-7">
            {project.challenge}
          </p>
        </div>

        <hr className="rule my-16 sm:my-20" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="eyebrow">Strategy</span>
            <h2 className="t-title max-w-[18ch]">The decision everything followed</h2>
          </div>
          <p className="t-body max-w-[58ch] text-[1.05rem] lg:col-span-6 lg:col-start-7">
            {project.strategy}
          </p>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="process-heading" className="shell pb-20 sm:pb-28">
        <div className="flex items-center gap-4">
          <span className="eyebrow">Process</span>
        </div>
        <h2 id="process-heading" className="t-section mt-6 max-w-[16ch]">
          Four moves, in order
        </h2>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2">
          {project.process.map((step) => (
            <li key={step.phase} className="flex flex-col gap-4 bg-bg p-7 sm:p-9">
              <span className="mono text-accent">{step.phase}</span>
              <h3 className="text-[1.15rem] font-medium tracking-[-0.02em] text-ink">
                {step.title}
              </h3>
              <p className="t-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Decisions ───────────────────────────────────────────────────── */}
      <section aria-labelledby="decisions-heading" className="shell pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">Decisions</span>
            <h2 id="decisions-heading" className="t-section max-w-[12ch]">
              The three that mattered
            </h2>
          </div>

          <ul className="flex flex-col lg:col-span-7 lg:col-start-6">
            {project.decisions.map((decision, i) => (
              <li
                key={decision.title}
                className="flex flex-col gap-3 border-t border-line py-8 last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="mono text-faint">0{i + 1}</span>
                  <h3 className="t-title text-[clamp(1.25rem,2.2vw,1.7rem)]">
                    {decision.title}
                  </h3>
                </div>
                <p className="t-body max-w-[56ch] pl-[2.4rem]">{decision.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Solution & gallery ──────────────────────────────────────────── */}
      <section aria-labelledby="solution-heading" className="shell pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <span className="eyebrow">The solution</span>
            <h2 id="solution-heading" className="t-title max-w-[16ch]">
              What shipped
            </h2>
          </div>
          <p className="t-body max-w-[58ch] text-[1.05rem] lg:col-span-6 lg:col-start-7">
            {project.solution}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-10 sm:gap-14">
          {project.gallery.map((item, i) => (
            <CaseReveal key={item.caption} delay={0.05}>
              <figure
                className={
                  i === 1
                    ? "sm:ml-auto sm:w-[78%]"
                    : i === 2
                      ? "sm:w-[86%]"
                      : "w-full"
                }
              >
                <div
                  className={`media-frame w-full overflow-hidden rounded-[3px] border border-line bg-surface ${
                    i === 1 ? "aspect-[4/3]" : "aspect-[16/9]"
                  }`}
                >
                  <ProjectVisual
                    variant={item.art}
                    accent={project.accent}
                    seed={`${project.slug}-g${i}`}
                    label={item.caption}
                  />
                </div>
                <figcaption className="mt-3 flex items-start gap-3 border-t border-line-faint pt-3">
                  <span className="mono flex-none text-accent">
                    FIG 0{i + 1}
                  </span>
                  <span className="text-[0.85rem] text-dim">{item.caption}</span>
                </figcaption>
              </figure>
            </CaseReveal>
          ))}
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────────────────── */}
      <section aria-labelledby="results-heading" className="relative border-y border-line py-20 sm:py-28">
        <Halo className="left-1/2 top-0 h-[40vw] w-[40vw] max-w-[520px] -translate-x-1/2" />
        <div className="shell relative grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <span className="eyebrow">Results</span>
            <h2 id="results-heading" className="t-section max-w-[10ch]">
              What <span className="display-italic text-accent">changed</span>
            </h2>
          </div>
          <p className="display max-w-[26ch] text-[clamp(1.4rem,2.8vw,2.1rem)] leading-[1.22] text-ink lg:col-span-7 lg:col-start-6">
            {project.results}
          </p>
        </div>
      </section>

      {/* ── Testimonial ─────────────────────────────────────────────────── */}
      {project.testimonial ? (
        <section aria-label="Client testimonial" className="shell py-20 sm:py-28">
          <figure className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <blockquote className="display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.2] text-ink lg:col-span-8">
              <span aria-hidden className="text-accent">
                &ldquo;
              </span>
              {project.testimonial.quote}
              <span aria-hidden className="text-accent">
                &rdquo;
              </span>
            </blockquote>
            <figcaption className="flex flex-col gap-1 self-end lg:col-span-3 lg:col-start-10">
              <span aria-hidden className="mb-2 h-px w-8 bg-accent" />
              <span className="text-[0.95rem] text-ink">{project.testimonial.name}</span>
              <span className="mono text-faint">{project.testimonial.title}</span>
            </figcaption>
          </figure>
        </section>
      ) : null}

      {/* ── Next project ────────────────────────────────────────────────── */}
      <section aria-label="Next project" className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          data-cursor-label="Next"
          className="group block py-16 transition-colors duration-500 hover:bg-surface/40 sm:py-20"
        >
          <div className="shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-3">
              <span className="mono text-faint">Next project</span>
              <span className="t-section block">
                {next.name}
                <span className="text-accent">.</span>
              </span>
              <span className="mono text-dim">{next.category}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="media-frame hidden aspect-[4/3] w-40 overflow-hidden rounded-[3px] border border-line bg-surface sm:block lg:w-56">
                <ProjectVisual
                  variant={next.art}
                  accent={next.accent}
                  seed={`${next.slug}-next`}
                />
              </div>
              <span className="grid h-12 w-12 flex-none place-items-center rounded-full border border-line-strong text-ink transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <Arrow dir="e" className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
