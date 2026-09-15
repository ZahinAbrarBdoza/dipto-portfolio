export type SocialKey = "linkedin" | "github" | "dribbble" | "behance" | "x" | "email";

export interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
  /** Shown in the footer index column. */
  handle: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

/** Abstract art direction for a project's generated visual. */
export type ArtVariant = "terminal" | "bloom" | "editorial" | "system" | "orbital";

export interface ProcessStep {
  phase: string;
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Short kicker shown under the name in the index. */
  category: string;
  year: string;
  role: string;
  /** One outcome-oriented line. Used in cards and meta description. */
  summary: string;
  /** Two to three sentences. Used on the case-study hero. */
  intro: string;
  stack: string[];
  metrics: Metric[];
  art: ArtVariant;
  accent: string;
  featured: boolean;
  /** Case study body. */
  challenge: string;
  strategy: string;
  process: ProcessStep[];
  decisions: { title: string; body: string }[];
  solution: string;
  gallery: { art: ArtVariant; caption: string }[];
  results: string;
  testimonial?: { quote: string; name: string; title: string };
}

export interface Service {
  index: string;
  title: string;
  body: string;
  deliverables: string[];
}

export interface Role {
  company: string;
  position: string;
  period: string;
  location: string;
  summary: string;
  achievement: string;
  disciplines: string[];
}

export interface SkillCluster {
  title: string;
  items: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export interface Credential {
  qualification: string;
  institution: string;
  period: string;
  /** Grade, status, or other short qualifier. */
  note: string;
}

export interface Activity {
  role: string;
  org: string;
}
