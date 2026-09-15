import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/Actions";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <span className="eyebrow">Error 404</span>
      <h1 className="t-section mt-6 max-w-[16ch]">
        This page doesn&rsquo;t exist —{" "}
        <span className="display-italic text-accent">but these do.</span>
      </h1>

      <div className="mt-10 flex flex-wrap gap-3">
        <ActionLink href="/" variant="primary" arrow="e">
          Back to the start
        </ActionLink>
        <ActionLink href="/#contact" variant="outline" arrow="ne">
          Get in touch
        </ActionLink>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-[3px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <li key={project.slug} className="bg-bg">
            <Link
              href={`/work/${project.slug}`}
              className="group flex flex-col gap-2 p-6 transition-colors duration-500 hover:bg-surface"
            >
              <span className="mono text-faint">{project.year}</span>
              <span className="t-title text-[1.3rem] transition-colors group-hover:text-accent">
                {project.name}
              </span>
              <span className="t-body text-[0.875rem]">{project.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
