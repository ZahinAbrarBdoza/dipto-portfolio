import type { NavItem, SocialLink, Stat } from "./types";

/* ══════════════════════════════════════════════════════════════════════════
   EDIT HERE — everything personal lives in this file.
   Replace the values below and the whole site updates: metadata, JSON-LD,
   Open Graph image, navigation, footer, contact section.
   ══════════════════════════════════════════════════════════════════════════ */

export const profile = {
  name: "Zahin",
  /** Used for the browser tab, JSON-LD and the footer wordmark. */
  fullName: "Md Zahin Abrar Badruddoza",
  monogram: "Z",
  role: "Data Analyst & Automation Engineer",
  specialization: "Data analysis, reporting and workflow automation in SQL and Python",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  /** IANA zone for the live clock in the hero. */
  ianaTimeZone: "Asia/Dhaka",
  email: "zahinabrar619@gmail.com",
  /** Optional — leave empty to hide the booking link. */
  calendar: "",
  availability: {
    open: true,
    label: "Open to data & analytics roles",
    responseTime: "Replies within 24 hours",
  },
  siteUrl: "https://dipto-portfolio-theta.vercel.app",
  /**
   * The positioning statement in the hero. `italic` renders in serif italic.
   * Keep each line under ~19 characters — beyond that it wraps at the largest
   * display size and the three-line composition breaks.
   */
  headline: [
    { text: "I turn raw data" },
    { text: "into reporting", italic: true },
    { text: "that runs itself." },
  ] as { text: string; italic?: boolean }[],
  intro:
    "I’m a data analyst and automation engineer at Padakhep Manabik Unnayan Kendra in Dhaka, working across programme and operational data. I build the reports and metrics that field and management teams rely on — and the Python and SQL automation behind them.",
  philosophy:
    "A report is only worth what its worst data point is worth, so I would rather fix the collection than keep rebuilding the spreadsheet.",
  currentFocus:
    "Automating reporting across programme and operational data at Padakhep, while studying for an Executive MBA in MIS at the University of Dhaka.",
  bio: [
    "I studied computer science at BRAC University and graduated in February 2025. The part that stuck was the data work: writing SQL, cleaning things up in Python, and getting a report out that someone can actually act on.",
    "Fintech showed me the live end of it. As a product engineer intern at Tallykhata I monitored transactional and operational data to keep services uninterrupted, traced anomalies back to a root cause, and moved data out of MySQL and PostgreSQL into Python-synced sheets and Looker Studio dashboards. At InsideMaps I worked the other end, managing large operational datasets and validating legal documents against multiple data points.",
    "Fintech or development sector, the job is the same: find the inconsistency, resolve it, then write down how the reporting is meant to work. Since May 2026 I have been doing that at Padakhep, and since September 2026 studying the management side of the same problem at the University of Dhaka. Away from the data, I sing and write songs.",
  ],
} as const;

export const stats: Stat[] = [
  { value: 3, suffix: "", label: "Organisations" },
  { value: 2, suffix: "", label: "Sectors — fintech & development" },
  { value: 6, suffix: "", label: "Selected projects" },
  { value: 3, suffix: ".14", label: "BSc CGPA, BRAC University" },
];

export const socials: SocialLink[] = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-zahin-abrar-badruddoza-9022a421a/",
    handle: "in/md-zahin-abrar-badruddoza",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/ZahinAbrarBdoza",
    handle: "@ZahinAbrarBdoza",
  },
];

/**
 * Options in the contact form's "What do you need?" select.
 * Shared by the form and the API route, so the email always names the same
 * thing the visitor picked — a second copy of this list drifted once already.
 */
export const contactScopes = [
  { value: "role", label: "A full-time role" },
  { value: "analysis", label: "Data analysis or reporting" },
  { value: "automation", label: "Reporting automation" },
  { value: "dashboard", label: "Dashboards & visualisation" },
  { value: "other", label: "Something else" },
] as const;

export function scopeLabel(value: string): string {
  return contactScopes.find((s) => s.value === value)?.label ?? value;
}

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Expertise", href: "/#expertise", id: "expertise" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

/** Wordmarks for the marquee. Text only — no borrowed logo files. */
export const clients: string[] = [
  "Padakhep Manabik Unnayan Kendra",
  "InsideMaps",
  "Tallykhata",
  "University of Dhaka",
  "BRAC University",
  "BRAC University MONON",
  "BRAC University IABC",
];
