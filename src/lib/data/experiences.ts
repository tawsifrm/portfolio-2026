export interface Experience {
  title: string;
  company: string;
  stack: string[];
  detail: string;
  date: string;
}

export const experiences: Experience[] = [
  {
    title: "Software Developer Intern",
    company: "Cineplex Digital Media",
    stack: ["Unity", "C#", "React", "Flask", "Python", "D3.js", "Three.js", "SQLite"],
    detail:
      "Built real-time customer tracking systems using Unity and Azure Kinect sensors, alongside interactive 3D retail configuration tools with full-stack analytics dashboards.",
    date: "May 2025 - Aug 2025"
  },
  {
    title: "Full-stack Developer",
    company: "Electrium Mobility",
    stack: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    detail:
      "Shipped a scalable e-commerce platform for EV rentals featuring secure auth flows, responsive UI, and streamlined database architecture.",
    date: "Sep 2024 - Apr 2025"
  },
  {
    title: "Full-stack Development Intern",
    company: "Mhapy",
    stack: ["React", "TailwindCSS", "NestJS", "Express", "PostgreSQL", "Figma"],
    detail:
      "Crafted patient-therapist matching features that boosted user engagement by 30%, from UI prototypes in Figma to backend APIs serving 1,000+ users.",
    date: "Jan 2024 - Aug 2024"
  },
  {
    title: "Firmware Team Member",
    company: "UWOrbital",
    stack: ["C", "FreeRTOS", "I2C", "UART"],
    detail:
      "Programmed embedded drivers and interrupt handlers for satellite microcontrollers, enabling reliable sensor communication via I2C and UART protocols.",
    date: "Jul 2023 - May 2024"
  }
];
