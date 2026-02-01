export interface Experience {
  title: string;
  company: string;
  stack: string[];
  detail: string;
  date: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    title: "Software Developer Intern",
    company: "Cineplex Digital Media",
    stack: ["Unity", "C#", "Azure Kinect SDK", "React", "Flask", "Python", "D3.js", "Three.js", "SQLite"],
    detail:
      "Engineered Unity C# systems with Azure Kinect sensors for precise customer interaction tracking and built interactive 3D configuration platforms for retail spaces.",
    date: "May 2025 - Aug 2025",
    achievements: [
      "Enabled precise customer interaction tracking with Unity C# system and Azure Kinect sensors",
      "Cut product placement setup time by 60% through interactive 3D configuration platform",
      "Reduced layout inconsistencies by 25+ manual actions with ray-casting and grid-based placement",
      "Built full-stack analytics pipeline with React frontend and Flask REST API for 10,000+ events per session",
      "Automated data parsing with Python and generated 2D/3D interaction maps using D3.js and Three.js"
    ]
  },
  {
    title: "Full-stack Developer",
    company: "Electrium Mobility",
    stack: ["Next.js", "Supabase", "TypeScript", "TailwindCSS"],
    detail:
      "Developed and deployed a scalable e-commerce platform for electric vehicle rentals with secure authentication and responsive design.",
    date: "Sep 2024 - Apr 2025",
    achievements: [
      "Developed and deployed scalable Next.js and Supabase e-commerce platform for electric vehicle rentals",
      "Architected secure authentication and authorization flows with Supabase Auth",
      "Designed responsive interface with Tailwind CSS, improving accessibility compliance",
      "Streamlined collaboration with Git/GitHub workflows, enabling faster iteration cycles"
    ]
  },
  {
    title: "Full-stack Development Intern",
    company: "Mhapy",
    stack: ["React", "TailwindCSS", "NestJS", "Express", "PostgreSQL", "Figma"],
    detail:
      "Integrated core functionalities for a patient-therapist matching website using React and Tailwind, driving a 30% increase in user engagement.",
    date: "Jan 2024 - Aug 2024",
    achievements: [
      "Integrated core features with React and Tailwind, boosting user engagement by 30%",
      "Boosted therapist recommendation accuracy by 25% with personalized matching flows using NestJS and Express",
      "Designed, maintained, and optimized PostgreSQL databases for 1,000+ active users",
      "Created interactive prototypes in Figma, accelerating iteration cycles on accessibility improvements",
      "Collaborated in Agile team of 7, delivering 10+ features through regular sprints"
    ]
  },
  {
    title: "Firmware Team Member",
    company: "UWOrbital",
    stack: ["C", "FreeRTOS", "I2C", "UART"],
    detail:
      "Developed real-time software and drivers for TI RM46 microcontroller in C and FreeRTOS.",
    date: "Jul 2023 - May 2024",
    achievements: [
      "Developed real-time software for TI RM46 microcontroller",
      "Implemented interrupt handling for temperature sensors",
      "Designed I2C-based sensor functions",
      "Developed UART data transmission systems"
    ]
  }
];
