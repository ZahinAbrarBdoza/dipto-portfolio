import type { Project } from "./types";

/* ══════════════════════════════════════════════════════════════════════════
   Six selected projects. Each entry drives both the index card and its case
   study page at /work/[slug]. Replace the copy; the layout adapts to length.
   `art` picks a generated abstract composition — see ProjectVisual.
   ══════════════════════════════════════════════════════════════════════════ */

export const projects: Project[] = [
  {
    slug: "reporting-automation",
    name: "Reporting Automation",
    category: "MIS reporting and data quality — Padakhep Manabik Unnayan Kendra",
    year: "2026",
    role: "Data Analyst & Automation Engineer",
    summary:
      "I replaced manual data collection and reporting cycles with Python and SQL automation at Padakhep.",
    intro:
      "At Padakhep Manabik Unnayan Kendra I analyse programme and operational data across the organisation and produce the reports and metrics the field and management teams use to track performance. The work here was moving that reporting off manual collection and consolidation and onto Python and SQL automation, while holding data quality across the MIS systems the reports are built from.",
    stack: ["Python", "SQL", "MIS systems"],
    metrics: [
      { value: "Python and SQL", label: "Automation tooling" },
      { value: "MIS systems", label: "Data source of record" },
      { value: "Development", label: "Sector and domain" },
    ],
    art: "terminal",
    accent: "#FF6A3D",
    featured: true,
    challenge:
      "Programme and operational data sits across the organisation, and the reports built from it were collected and consolidated by hand every time the numbers were needed. Each repetition was another chance for a figure to drift away from the system it came from. The MIS data feeding those reports also needed checking rather than assuming, because a report is only as trustworthy as the records behind it.",
    strategy:
      "I treated the reporting cycle as one pipeline rather than a stack of separate documents. SQL does the extraction from the MIS systems and Python does the consolidation and the output, so the reports are produced by code instead of by hand. Alongside that I keep validation and reconciliation checks on the MIS data, and I document the reporting logic so it is readable by someone other than me.",
    process: [
      {
        phase: "01",
        title: "Map the manual reporting cycle",
        body: "I traced how each report was actually being produced: which systems the data came from, what was collected by hand, and where consolidation happened. That showed me which steps were worth automating and which were judgement calls.",
      },
      {
        phase: "02",
        title: "Build the SQL extract layer",
        body: "I wrote the SQL that pulls programme and operational data straight from the MIS systems, so the reports I automated start from the same queries each time rather than from a fresh manual collection.",
      },
      {
        phase: "03",
        title: "Automate consolidation in Python",
        body: "Python takes the extracts, consolidates them and produces the reports and metrics the field and management teams use. The manual collect-and-assemble step comes out of the loop.",
      },
      {
        phase: "04",
        title: "Validate, reconcile, document",
        body: "I run validation and reconciliation checks against the MIS data so mismatches surface rather than sit inside a report. I wrote the reporting logic up in structured documentation alongside it.",
      },
    ],
    decisions: [
      {
        title: "Automate the cycle, not single reports",
        body: "Automating one report would have left the same manual collection underneath it. I automated the collection and consolidation stages so the reports built on top of them inherit the change.",
      },
      {
        title: "Keep data quality checks part of the work",
        body: "Validation and reconciliation are standing checks on the MIS records, not a tidy-up done once. Figures get checked against the data they came from rather than trusted because automation produced them.",
      },
      {
        title: "Document reporting logic alongside the code",
        body: "Reporting rules that only live in someone’s head cannot be reviewed or handed over. I keep structured documentation of how the reported metrics are defined and derived.",
      },
    ],
    solution:
      "A Python and SQL pipeline that extracts programme and operational data from the MIS systems, consolidates it and produces the reports and metrics the field and management teams use to track performance. Validation and reconciliation checks sit over the same MIS data, and the reporting logic behind each output is written up in structured documentation. The manual collection, consolidation and reporting steps are handled by the automation rather than repeated by hand.",
    gallery: [
      {
        art: "terminal",
        caption: "Python job consolidating MIS extracts into the reporting outputs",
      },
      {
        art: "system",
        caption: "SQL query layer behind the reports the field and management teams use",
      },
      {
        art: "editorial",
        caption: "Validation checks and documentation of how each metric is derived",
      },
    ],
    results:
      "Reporting cycles that were previously collected and consolidated by hand now run as automation, and the reports teams rely on are built from the MIS systems each time. Data quality is held up by validation and reconciliation against those records, and the logic behind each reported metric is written down instead of carried in my head. That leaves the reporting open to review by someone other than me.",
  },
  {
    slug: "transaction-monitoring",
    name: "Transaction Monitoring",
    category: "Live service and anomaly response — Tallykhata",
    year: "2025",
    role: "Product Engineer Intern",
    summary:
      "I monitored transactional and operational data at Tallykhata, tracing anomalies to root cause to keep services uninterrupted.",
    intro:
      "As a Product Engineer Intern at Tallykhata, I monitored transactional and operational data for the anomalies that point to a service problem. When something did not hold up, I worked back through the records to a root cause and resolved it in real time, so the service stayed uninterrupted. I also built and maintained the Looker Studio dashboards that visualised performance metrics and operational trends for technical and business teams.",
    stack: ["SQL", "MySQL", "PostgreSQL", "Looker Studio"],
    metrics: [
      { value: "Real time", label: "Resolution turnaround" },
      { value: "Looker Studio", label: "Dashboard delivery surface" },
      { value: "Fintech", label: "Sector and domain" },
    ],
    art: "orbital",
    accent: "#5BB4A0",
    featured: true,
    challenge:
      "Tallykhata’s services run on transaction data, so a fault in that flow reaches people as a service that does not work. The monitoring job was to detect anomalies in the transactional and operational data, find the cause rather than the symptom, and deal with it while the service was still running. The reporting job sat next to it: technical and business teams needed performance metrics and operational trends they could read for themselves.",
    strategy:
      "I treated monitoring as a loop rather than an alarm: watch the transactional and operational data, look for what does not fit, then follow anything odd down to its cause instead of clearing the symptom. SQL was the main instrument, because the explanation usually sits in the records rather than in the summary. The reporting side ran in Looker Studio, where I built and maintained the dashboards that carried performance metrics and operational trends for both audiences.",
    process: [
      {
        phase: "01",
        title: "Watch the transaction data",
        body: "I kept transactional and operational data under observation, looking for readings that did not match the pattern the data usually held.",
      },
      {
        phase: "02",
        title: "Separate noise from fault",
        body: "When a figure moved oddly, I checked it against the surrounding data first. Not every irregular reading is a fault, and treating it as one costs attention a real incident needs.",
      },
      {
        phase: "03",
        title: "Trace it back in SQL",
        body: "I queried the transaction records in SQL to follow the anomaly back to where it started, rather than stopping at the point where it became visible.",
      },
      {
        phase: "04",
        title: "Resolve, then report",
        body: "I resolved issues in real time so the service kept running. The reporting sat in Looker Studio, where I built and maintained the dashboards for performance metrics and operational trends.",
      },
    ],
    decisions: [
      {
        title: "Trace to cause, not to symptom",
        body: "Clearing a visible symptom leaves the fault in place to return later. I made root-cause analysis part of the response rather than a follow-up task.",
      },
      {
        title: "Treat the records as the reference",
        body: "A dashboard is a reading of the data, not the data. When something looked wrong on the surface, I went back to the underlying records and worked from those.",
      },
      {
        title: "Build dashboards two audiences could read",
        body: "Technical and business teams were reading the same performance metrics for different reasons. I built the Looker Studio views to suit both rather than one.",
      },
    ],
    solution:
      "I monitored Tallykhata’s transactional and operational data for anomalies, performed root-cause analysis on the ones that held up, and resolved issues in real time so services stayed uninterrupted. Alongside that I built and maintained Looker Studio dashboards that visualised performance metrics and surfaced operational trends for technical and business teams. I did this as an intern, working inside systems I did not own.",
    gallery: [
      {
        art: "orbital",
        caption: "Looker Studio dashboard showing transaction performance metrics",
      },
      {
        art: "terminal",
        caption: "SQL query tracing an anomaly back through the transaction records",
      },
      {
        art: "bloom",
        caption: "Operational trend view built for technical and business teams",
      },
    ],
    results:
      "Anomalies were found and resolved while the service was still live, which is what the monitoring was there for: keeping Tallykhata’s services uninterrupted. The Looker Studio dashboards I built and maintained gave technical and business teams a standing view of performance metrics and operational trends. Both ran for the length of the internship, March to July 2025.",
  },
  {
    slug: "sheets-sync-pipeline",
    name: "Sheets Sync Pipeline",
    category: "Database automation and dashboards — Tallykhata",
    year: "2025",
    role: "Product Engineer Intern",
    summary:
      "I automated database-to-Google-Sheets syncing with Python and built Looker Studio dashboards for performance reporting.",
    intro:
      "As a Product Engineer Intern at Tallykhata, I extracted, cleaned and analysed data in MySQL and PostgreSQL, then wrote Python to sync it into Google Sheets instead of assembling reports by hand. Separately I built and maintained Looker Studio dashboards that visualised performance metrics and surfaced operational trends for technical and business teams.",
    stack: ["Python", "MySQL", "PostgreSQL", "Google Sheets", "Looker Studio"],
    metrics: [
      { value: "Python", label: "Automation language" },
      { value: "MySQL, PostgreSQL", label: "Source databases" },
      { value: "Looker Studio", label: "Reporting surface" },
    ],
    art: "bloom",
    accent: "#7C8CFF",
    featured: true,
    challenge:
      "The numbers people needed sat in MySQL and PostgreSQL, but the reporting they worked from lived in spreadsheets. Getting from one to the other meant running queries and moving the results across by hand every time a report was wanted. The same performance metrics and operational trends also had to be readable by technical and business teams, not only by whoever ran the query.",
    strategy:
      "I treated the manual reporting cycle as two problems: getting clean data out of the databases reliably, and presenting it so each audience could read it. The extraction and cleaning were settled in SQL first, so the Python layer only had to move a result that was already correct. Google Sheets was the landing point for the sync, and the Looker Studio dashboards covered the visual side for technical and business teams.",
    process: [
      {
        phase: "01",
        title: "Pin down the queries",
        body: "I worked through the MySQL and PostgreSQL extracts the recurring reports depended on, cleaning and analysing the data until the SQL produced the shape the report needed. That kept each figure defined in the query rather than in the spreadsheet.",
      },
      {
        phase: "02",
        title: "Automate the sync in Python",
        body: "I wrote Python to run those queries and push the results into Google Sheets, replacing the manual copy step. The script handled the database connection, the query run and the write into the target sheet.",
      },
      {
        phase: "03",
        title: "Build the dashboards",
        body: "I built Looker Studio dashboards to visualise performance metrics and surface operational trends. The layouts were made to be read by technical and business teams alike.",
      },
      {
        phase: "04",
        title: "Maintain the reporting",
        body: "I maintained the dashboards as reporting needs changed, and kept the SQL behind the sync in step with them. When a figure looked off, the query was the first place I checked.",
      },
    ],
    decisions: [
      {
        title: "Keep the logic in SQL, not Python",
        body: "I did the cleaning and aggregation in the query so the Python layer stayed a transport step. That left one place to check when a figure looked off.",
      },
      {
        title: "Google Sheets as the handover layer",
        body: "Landing the data in Sheets kept the output in a format people could open, filter and work with directly. It also gave the sync a simple, predictable target to write to.",
      },
      {
        title: "Dashboards written for two audiences",
        body: "Technical and business teams looked at the same metrics for different reasons, so I framed the dashboards around performance metrics and operational trends both could act on.",
      },
    ],
    solution:
      "What shipped was a Python sync that moved cleaned MySQL and PostgreSQL query results into Google Sheets, plus a set of Looker Studio dashboards I built and maintained. The dashboards visualised performance metrics and surfaced operational trends for technical and business teams. Behind the reporting, the SQL extracts stayed the definition of each figure.",
    gallery: [
      { art: "system", caption: "Python sync moving MySQL query output into a Google Sheet" },
      { art: "bloom", caption: "Looker Studio dashboard of operational performance metrics" },
      {
        art: "terminal",
        caption: "SQL extract and cleaning step behind the synced reporting tables",
      },
    ],
    results:
      "The manual work of pulling data out of the databases and assembling it into reporting was handled by the Python sync instead, which is what it was written to cut. The Looker Studio dashboards gave technical and business teams one place to read performance metrics and operational trends.",
  },
  {
    slug: "data-integrity",
    name: "Data Integrity",
    category: "Operational dataset governance — InsideMaps",
    year: "2025 — 2026",
    role: "Data Operations Officer",
    summary:
      "I managed large-scale operational datasets and validated HOA legal documents against multiple data points.",
    intro:
      "As Data Operations Officer at InsideMaps I managed large-scale operational datasets held in Google Workspace and Excel. Alongside that I reviewed, organised and validated HOA legal documents, cross-referencing each one against the other data points held for the same record. The point was to keep the set accurate, consistent and documented across both systems, because compliance and data integrity rested on it.",
    stack: ["Google Workspace", "Excel", "Data cleaning", "Documentation"],
    metrics: [
      { value: "HOA legal documents", label: "Records reviewed" },
      { value: "Google Workspace", label: "Work surface" },
      { value: "Excel", label: "Dataset management" },
    ],
    art: "editorial",
    accent: "#C9A227",
    featured: true,
    challenge:
      "The operational data sat across Google Workspace and Excel, and the HOA legal documents had to agree with the records describing the same thing. A disagreement between the two was not visible from a single source; it showed up only when a document was read against the other data points held for that record. Accuracy, consistency and structured documentation across those systems were the job, because compliance and data integrity rested on them.",
    strategy:
      "I treated the document review as a cross-referencing exercise rather than a reading exercise. Each HOA legal document was checked against the other data points held for the same record, so a mismatch surfaced as a specific disagreement rather than a vague doubt. What I resolved went back into the documentation, so the record carried the check as well as the correction.",
    process: [
      {
        phase: "01",
        title: "Organise the incoming records",
        body: "I organised the operational datasets into a consistent structure across Google Workspace and Excel, so records were stored and labelled the same way.",
      },
      {
        phase: "02",
        title: "Read against multiple data points",
        body: "Each HOA legal document was reviewed against the other data points held for the same record. Nothing was accepted on the strength of a single source.",
      },
      {
        phase: "03",
        title: "Trace and resolve discrepancies",
        body: "Where sources disagreed I traced the inconsistency back to the field it came from and resolved it, rather than leaving a flag for somebody else to interpret.",
      },
      {
        phase: "04",
        title: "Write the reasoning down",
        body: "Resolutions were documented alongside the record, so the check stayed visible afterwards and could be repeated by anyone picking the file up.",
      },
    ],
    decisions: [
      {
        title: "No single source taken on trust",
        body: "A legal document and the operational record were each treated as a claim to be checked against the other. That is what made inconsistencies findable instead of invisible.",
      },
      {
        title: "Structure first, then checking",
        body: "I organised the datasets into a consistent shape before reviewing them. Checking an unstructured set produces findings you cannot compare across records.",
      },
      {
        title: "Document the reasoning, not just the fix",
        body: "Correcting one record only helps that record. Writing down how the discrepancy was identified and resolved meant the same check could be repeated on the next one.",
      },
    ],
    solution:
      "What I delivered was a maintained set of operational datasets in Google Workspace and Excel, with HOA legal documents reviewed, organised and validated against the wider record. Discrepancies were resolved rather than annotated, and the structured documentation around them was kept current. That was the work behind compliance and data integrity across those systems.",
    gallery: [
      {
        art: "system",
        caption: "Operational dataset organised in Google Workspace, ready for review",
      },
      {
        art: "editorial",
        caption: "HOA legal document read against the data points for the same record",
      },
      {
        art: "terminal",
        caption: "Excel workbook cross-checking a record against its legal document",
      },
    ],
    results:
      "Inconsistencies sitting between a legal document and the operational data were identified and resolved, and the documentation and record accuracy around them improved. Reading a document against the other data points held for the same record, rather than on its own, is what made those inconsistencies findable at all. The resolutions were written down, so the check behind a record was visible afterwards rather than held in someone’s head.",
  },
  {
    slug: "stock-forecasting",
    name: "Stock Forecasting",
    category: "Predictive modelling — university project",
    year: "2025",
    role: "Solo project",
    summary:
      "A Python stock price forecaster built on linear regression and decision trees, with a dashboard to read it.",
    intro:
      "I built a stock price forecaster in Python, using linear regression and decision-tree models over historical financial data. pandas did the preparation and the trend analysis, and a custom dashboard visualised those trends alongside the forecasts so the output could be read for business interpretation.",
    stack: ["Python", "pandas", "Linear regression", "Decision trees", "Custom dashboard"],
    metrics: [
      { value: "Python", label: "Project language" },
      { value: "Regression & trees", label: "Forecasting models" },
      { value: "Custom dashboard", label: "Business output" },
    ],
    art: "terminal",
    accent: "#4EA8DE",
    featured: false,
    challenge:
      "Historical stock data arrives as a long series of prices: useful for modelling, but not something you can read a decision out of. The project needed two things at once, a model that produces a forecast and a way of presenting that forecast that makes sense to someone reading it for business interpretation rather than for the maths. As a university project it had to cover the full span, from preparing the data through to the final view.",
    strategy:
      "I kept the data work and the modelling work separate. pandas did the loading, preparation and analysis of the historical financial data, so the model code only ever saw a prepared series. On top of that I fitted two model families, linear regression and a decision tree, so the forecast never rested on a single assumption about how prices move. The dashboard was treated as part of the deliverable rather than something bolted on at the end.",
    process: [
      {
        phase: "01",
        title: "Assemble historical price data",
        body: "I pulled the historical financial data together into a single working set and checked it for gaps and obvious errors before any modelling started.",
      },
      {
        phase: "02",
        title: "Analyse the series in pandas",
        body: "pandas handled the preparation, shaping and trend analysis. That gave me a clear picture of how the series behaved before I fitted anything to it.",
      },
      {
        phase: "03",
        title: "Fit regression and tree models",
        body: "I trained a linear regression model and a decision-tree model on the same prepared data, then looked at how each one forecast the series.",
      },
      {
        phase: "04",
        title: "Build the dashboard",
        body: "I built a custom dashboard that visualises the historical trends alongside the forecasts, so the output can be read directly rather than pulled out of a results table.",
      },
    ],
    decisions: [
      {
        title: "Two model families rather than one",
        body: "Linear regression gives a readable baseline trend, while a decision tree can pick up splits a straight line misses. Fitting both meant the forecast did not rest on one assumption about how prices move.",
      },
      {
        title: "pandas as the single data layer",
        body: "Putting every preparation and analysis step in pandas kept the data work in one place and repeatable, so the modelling code never had to handle raw input.",
      },
      {
        title: "Dashboard framed for business interpretation",
        body: "The dashboard existed for business interpretation, so I built the views around reading the forecast against the historical trend rather than around the model internals.",
      },
    ],
    solution:
      "The finished project is a Python pipeline that takes historical financial data, prepares and analyses it with pandas, and produces price forecasts from both a linear regression model and a decision-tree model. A custom dashboard sits on top of it, visualising the historical trends next to the forecast output. The point of the dashboard is interpretation: it puts what the models produce into a form a business reader can read directly.",
    gallery: [
      {
        art: "terminal",
        caption: "Dashboard view of forecast prices against the historical series",
      },
      { art: "system", caption: "pandas preparing and analysing the historical financial data" },
      {
        art: "orbital",
        caption: "Linear regression and decision-tree forecasts shown side by side",
      },
    ],
    results:
      "The work turned a historical price series into something readable, with trends visualised, forecasts produced by two different methods, and both presented in one place. The forecasts sit next to the history in a single view, which is what makes the output usable for business interpretation rather than only for modelling. As a university project the lasting value is the end-to-end pattern: prepare in pandas, model in Python, present in a dashboard.",
  },
  {
    slug: "movie-management",
    name: "Movie Management",
    category: "Full-stack web application — university project",
    year: "2025",
    role: "Solo project",
    summary:
      "A responsive Flask and MySQL web app with user login, movie rating and discussion features.",
    intro:
      "Movie Management is a university web application I built in Flask with a MySQL database and an HTML and CSS front end. It carries user login, movie rating and discussion features, so a signed-in user can score a film and talk about it in the same place. The layout is responsive, so the same pages hold up on a phone and on a laptop.",
    stack: ["Flask", "MySQL", "HTML", "CSS"],
    metrics: [
      { value: "Flask + MySQL", label: "Application stack" },
      { value: "Responsive web app", label: "Delivery surface" },
      { value: "University project", label: "Role and context" },
    ],
    art: "system",
    accent: "#9E7BFF",
    featured: false,
    challenge:
      "This was a university build that ran from the database through to the pages people actually see, so every layer had to hold together. Movie rating and discussion both depend on knowing who the user is, which meant login had to exist before either feature made sense. The pages also had to work across screen sizes rather than assume a desktop browser.",
    strategy:
      "I treated it as connected layers rather than one big build: accounts, then ratings tied to those accounts, then discussion tied to both. MySQL held the users, the movies, the ratings and the discussion entries, and Flask sat in front of it handling routes and sessions. The HTML and CSS were written to be responsive rather than fitted to a single screen size.",
    process: [
      {
        phase: "01",
        title: "Model the data in MySQL",
        body: "I laid out the tables for users, movies, ratings and discussion entries, and worked out how they relate. Getting the relationships right kept the later features from fighting the schema.",
      },
      {
        phase: "02",
        title: "Build login and sessions",
        body: "I implemented user login in Flask so the application could tell one visitor from another. Everything personal in the app hangs off that.",
      },
      {
        phase: "03",
        title: "Add rating and discussion",
        body: "With accounts in place I added movie rating and the discussion features, each tied back to the logged-in user. The aim was that scoring a film and talking about it felt like one flow rather than two separate tools.",
      },
      {
        phase: "04",
        title: "Make the pages responsive",
        body: "I wrote the HTML and CSS so the pages hold their shape across screen sizes. Then I went through the app as a user would, checking the interactions from login onwards.",
      },
    ],
    decisions: [
      {
        title: "Login before any user-linked feature",
        body: "Ratings and discussion only mean anything attached to a person, so I built authentication first rather than bolting it on afterwards. That kept the later features simple, because the user was always available.",
      },
      {
        title: "Keep the state in MySQL, not the app",
        body: "Users, movies, ratings and discussion entries all live in the database rather than in application memory or files. It meant the relationships between them could be expressed in SQL instead of reimplemented in Python.",
      },
      {
        title: "Plain HTML and CSS for the front end",
        body: "I wrote the interface directly in HTML and CSS rather than reaching for anything heavier. For an app of this size it kept the responsive behaviour easy to reason about and easy to change.",
      },
    ],
    solution:
      "I delivered a working responsive web application: a Flask server over a MySQL database, with HTML and CSS pages that adapt across screen sizes. A signed-in user can rate movies and take part in discussion around them, all from the same interface. The focus throughout was on the interaction feeling smooth rather than on adding features for their own sake.",
    gallery: [
      {
        art: "bloom",
        caption: "Login page, with the form laid out for small and large screens",
      },
      {
        art: "system",
        caption: "Movie page showing the rating control and the discussion thread below",
      },
      {
        art: "orbital",
        caption: "MySQL schema linking users, movies, ratings and discussion entries",
      },
    ],
    results:
      "The project gave me an end-to-end build that ran from schema to stylesheet, which is a different kind of work from analysis. It put movie rating and discussion behind a single login in one interface. It also gave me practical Flask and MySQL experience I carried into later work with databases and Python.",
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getAdjacentProject = (slug: string): Project => {
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  // projects is a non-empty literal, so this is always defined.
  return next ?? (projects[0] as Project);
};
