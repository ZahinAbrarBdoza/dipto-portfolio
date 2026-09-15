import type {
  Activity,
  Credential,
  Role,
  Service,
  SkillCluster,
  Testimonial,
} from "./types";

export const services: Service[] = [
  {
    index: "01",
    title: "Data Analysis & Reporting",
    body: "Turning transactional and operational data into the reports people actually run on — the numbers a field team or a management team checks before they decide anything.",
    deliverables: ["SQL analysis", "Recurring reports", "Metric definitions", "Ad-hoc investigation"],
  },
  {
    index: "02",
    title: "Workflow Automation",
    body: "Replacing manual collection, consolidation and reporting cycles with Python and SQL. If a report is assembled by hand every week, it should not be.",
    deliverables: ["Python automation", "Scheduled syncs", "Database-to-Sheets pipelines"],
  },
  {
    index: "03",
    title: "Dashboards & Visualisation",
    body: "Looker Studio dashboards that surface performance metrics and operational trends, built to be read by technical and business teams without translation.",
    deliverables: ["Looker Studio", "Google Sheets models", "Trend views", "Handover docs"],
  },
  {
    index: "04",
    title: "Data Quality & MIS",
    body: "Validation checks, reconciliation and structured documentation of reporting logic — so a number can be traced back to where it came from and defended.",
    deliverables: ["Validation checks", "Reconciliation", "Reporting logic docs"],
  },
  {
    index: "05",
    title: "SQL & Database Work",
    body: "Extracting, cleaning and analysing data in MySQL and PostgreSQL. Most of the work is upstream of the chart, and that is where the errors live.",
    deliverables: ["Query development", "Data cleaning", "Schema familiarisation"],
  },
  {
    index: "06",
    title: "Live Service Monitoring",
    body: "Watching transactional and operational data in real time: detecting anomalies, running root-cause analysis and resolving issues while the service stays up.",
    deliverables: ["Anomaly detection", "Root-cause analysis", "Incident resolution"],
  },
];

export const roles: Role[] = [
  {
    company: "Padakhep Manabik Unnayan Kendra",
    position: "Data Analyst & Automation Engineer",
    period: "May 2026 — Present",
    location: "Dhaka",
    summary:
      "Analysing programme and operational data across the organisation, and producing the reports and metrics the field and management teams use to track performance.",
    achievement:
      "Building Python and SQL automation to replace manual data collection, consolidation and reporting cycles, and holding data quality across MIS systems with validation checks, reconciliation and documented reporting logic.",
    disciplines: ["Python", "SQL", "MIS", "Data quality"],
  },
  {
    company: "InsideMaps",
    position: "Data Operations Officer",
    period: "Aug 2025 — Apr 2026",
    location: "Remote",
    summary:
      "Managed large-scale operational datasets in Google Workspace and Excel, keeping accuracy, consistency and structured documentation intact across systems.",
    achievement:
      "Reviewed and validated HOA legal documents against multiple data points to maintain compliance, then chased down the inconsistencies that surfaced and resolved them.",
    disciplines: ["Data operations", "Validation", "Documentation"],
  },
  {
    company: "Tallykhata",
    position: "Product Engineer Intern",
    period: "Mar 2025 — Jul 2025",
    location: "Dhaka",
    summary:
      "Monitored transactional and operational data to keep services uninterrupted — detecting anomalies, performing root-cause analysis and resolving issues in real time.",
    achievement:
      "Automated database-to-Google-Sheets syncing with Python over MySQL and PostgreSQL, and built the Looker Studio dashboards technical and business teams read for performance and operational trends.",
    disciplines: ["MySQL", "PostgreSQL", "Looker Studio", "Monitoring"],
  },
];

export const skillClusters: SkillCluster[] = [
  {
    title: "Languages & databases",
    items: ["Python", "SQL", "MySQL", "PostgreSQL", "HTML", "CSS"],
  },
  {
    title: "Data & visualisation",
    items: ["Looker Studio", "pandas", "Google Sheets", "Excel"],
  },
  {
    title: "Tools",
    items: [
      "Git / GitHub",
      "Claude Code",
      "Codex",
      "Microsoft Office",
      "LaTeX",
      "Canva",
      "Photoshop",
    ],
  },
  {
    title: "Practice",
    items: [
      "Data cleaning",
      "Workflow automation",
      "Live service monitoring",
      "SDLC",
      "Stakeholder communication",
    ],
  },
];

export const education: Credential[] = [
  {
    qualification: "Executive MBA, Management Information Systems",
    institution: "University of Dhaka",
    period: "Sep 2026 — Present",
    note: "In progress",
  },
  {
    qualification: "BSc in Computer Science",
    institution: "BRAC University, Dhaka",
    period: "Jun 2021 — Feb 2025",
    note: "CGPA 3.14",
  },
  {
    qualification: "HSC & SSC",
    institution: "Scholars’ School & College, Dhaka",
    period: "2018 — 2020",
    note: "GPA 5.00",
  },
];

export const certifications: string[] = ["HackerRank SQL (Basic)"];

export const activities: Activity[] = [
  { role: "Secretary of Finance", org: "BRAC University MONON" },
  { role: "Senior Executive, Branding & Communication", org: "BRAC University IABC" },
  { role: "Singer and songwriter", org: "Outside work" },
];

/**
 * Empty on purpose. Testimonials are the one thing on this site that cannot be
 * drafted — a quote attributed to a named person at a named employer has to be
 * real. Add entries here when you have them and the section appears; leave it
 * empty and the section does not render at all.
 */
export const testimonials: Testimonial[] = [];
