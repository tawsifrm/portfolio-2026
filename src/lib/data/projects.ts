export interface Project {
  title: string;
  stack: string[];
  date: string;
  detail: string;
  link: string;
  github: string;
}

export const projects: Project[] = [
  {
    title: "Rosetta",
    stack: ["React", "FastAPI", "PostgreSQL", "RAG"],
    date: "Jan 2026",
    detail: "3rd place at HackHive - live lecture translation platform with RAG pipeline and real-time contextual citations.",
    link: "https://devpost.com/software/rosetta-hq6aby?_gl=1*igx6fd*_gcl_au*MTkyMzcwMjg4OC4xNzY4NDQyNDgx*_ga*MTE1OTIyNDQxMS4xNzY5MDQ4NjIy*_ga_0YHJK3Y10M*czE3Njk5OTkzOTkkbzI0JGcxJHQxNzY5OTk5NDA2JGo1MyRsMCRoMA..",
    github: "https://github.com/AbeerDas/Rosetta-HackHive"
  },
  {
    title: "BetterKaraoke",
    stack: ["React Native", "Expo", "Expo AV"],
    date: "Aug 2025",
    detail: "Sing your heart out with friends in real-time multiplayer karaoke.",
    link: "https://github.com/tawsifrm/BetterKaraoke",
    github: "https://github.com/tawsifrm/BetterKaraoke"
  },
  {
    title: "TerraCustos",
    stack: ["React", "Mapbox", "Supabase", "GraphQL"],
    date: "Jan 2025",
    detail: "Track disasters as they happen on an interactive global map.",
    link: "https://github.com/tawsifrm/OEC2025",
    github: "https://github.com/tawsifrm/OEC2025"
  },
  {
    title: "Handwriting Recognition API",
    stack: ["C++", "OpenCV", "Boost", "RESTful API"],
    date: "Oct 2024",
    detail: "Turn messy handwriting into clean, machine-readable text.",
    link: "https://github.com/tawsifrm/Handwriting-Recognition-API",
    github: "https://github.com/tawsifrm/Handwriting-Recognition-API"
  },
  {
    title: "PTCG Dex",
    stack: ["React Native", "Pokemon TCG API"],
    date: "Sep 2024",
    detail: "Every Pokémon card ever made, right in your pocket.",
    link: "https://github.com/tawsifrm/PTCG-Dex",
    github: "https://github.com/tawsifrm/PTCG-Dex"
  },
  {
    title: "Dynamic World Generation - WEC",
    stack: ["Python", "Turtle", "BFS"],
    date: "Jul 2024",
    detail: "1st place algorithm that builds and navigates worlds on the fly.",
    link: "https://github.com/tawsifrm/WEC-2024",
    github: "https://github.com/tawsifrm/WEC-2024"
  },
  {
    title: "Bricks Be Gone",
    stack: ["Java", "XML", "Android Studio"],
    date: "Jan 2024",
    detail: "Classic brick breaker with a modern Android twist.",
    link: "https://github.com/tawsifrm/Bricks-Be-Gone",
    github: "https://github.com/tawsifrm/Bricks-Be-Gone"
  }
];
