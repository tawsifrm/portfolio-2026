export interface Experience {
  title: string;
  company: string;
  location: string;
  stack: string[];
  details: string[];
  date: string;
  /** Optional company logo. Drop a file in public/images/experience/ and
   *  reference it as "/images/experience/<name>.png". Falls back to a
   *  company-initials monogram if the file is missing. */
  logo?: string;
}

export const experiences: Experience[] = [
  {
    title: "Software Developer, Part-Time",
    company: "Empire Life Insurance Company",
    location: "Toronto, ON",
    stack: ["Java", "Spring", "REST", "Auth0", "Message Queue"],
    details: [
      "Delivered a Java/Spring API returning any record’s state as of a past date, refactoring to hexagonal architecture that moved 150+ lines of persistence logic into adapters.",
      "Migrated a downstream service onto a new internal API, implementing 8 REST integrations behind one interface and securing service-to-service calls with scoped Auth0 grants.",
      "Designed end-to-end test automation spanning a TCP listener, message queue, and REST API across 12+ scenarios, replacing a shared consumer with per-request queues to eliminate flaky failures."
    ],
    date: "May 2026 - Present",
    logo: "/images/experience/empire-life.png"
  },
  {
    title: "Software Developer Intern",
    company: "Empire Life Insurance Company",
    location: "Toronto, ON",
    stack: ["GCP", "Pub/Sub", "SQLAlchemy", "Terraform", "Docker", "Helm", "Argo CD", "Datadog"],
    details: [
      "Built an event-driven ETL pipeline on Google Cloud Pub/Sub and SQLAlchemy that has loaded 4,000+ partner records across 600+ files with zero failed imports.",
      "Extended the platform to run on either SQL Server or legacy Sybase from one codebase, validating a live database migration across 5 services with zero downtime.",
      "Provisioned buckets, topics, and scoped service accounts as reusable Terraform modules and shipped distroless Docker images via Helm and Argo CD, making every environment reproducible from version control.",
      "Built a Datadog observability dashboard on OpenTelemetry traces, wiring 14 monitors over imports and failures."
    ],
    date: "Jan 2026 - Apr 2026",
    logo: "/images/experience/empire-life.png"
  },
  {
    title: "Software Developer Intern",
    company: "Cineplex Digital Media",
    location: "Waterloo, ON",
    stack: ["Unity", "C#", "React", "Flask", "SQLite"],
    details: [
      "Built a real-time spatial system in Unity (C#) that reconstructs retail environments and models customer touch behavior from depth-sensing data.",
      "Cut in-store merchandising setup time by 60% with an interactive 3D configuration workflow backed by SQLite persistence.",
      "Scaled analytics to 10,000+ interactions per session through a React and Flask pipeline visualizing customer engagement."
    ],
    date: "May 2025 - Aug 2025",
    logo: "/images/experience/cineplex.png"
  },
  {
    title: "Full-Stack Developer",
    company: "Electrium Mobility",
    location: "Waterloo, ON",
    stack: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    details: [
      "Built an e-commerce platform for electric vehicle rentals with Next.js and Supabase, covering checkout and login flows.",
      "Delivered a responsive storefront UI and a streamlined database schema for managing rental inventory."
    ],
    date: "Sept 2024 - Apr 2025",
    logo: "/images/experience/electrium.png"
  },
  {
    title: "Full-Stack Development Intern",
    company: "Mhapy",
    location: "Toronto, ON",
    stack: ["React", "TailwindCSS", "NestJS", "Express", "PostgreSQL"],
    details: [
      "Shipped 10+ features on an Agile team of 7 for a patient-therapist matching platform, raising engagement 30% with React.",
      "Developed recommendation workflows with NestJS, Express, and PostgreSQL that improved matching accuracy 25%."
    ],
    date: "Jan 2024 - Aug 2024",
    logo: "/images/experience/mhapy.png"
  }
];
