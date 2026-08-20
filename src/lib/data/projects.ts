export interface Project {
  title: string;
  stack: string[];
  date: string;
  detail: string;
  link: string;
  github: string;
  /** Optional cover screenshot. When set, it replaces the gradient cover.
   *  Drop a file in public/images/projects/ and reference it as
   *  "/images/projects/<name>.webp". */
  image?: string;
}

/** On-brand cover gradients (fuchsia / purple / blue), dark enough for white
 *  text. Shared by the desktop carousel and the mobile project cards so a
 *  given project always gets the same cover. */
export const coverGradients = [
  'linear-gradient(135deg, #1b0f2e 0%, #2a1745 50%, #3a1d5c 100%)',
  'linear-gradient(135deg, #0e1430 0%, #172554 50%, #1e3a8a 100%)',
  'linear-gradient(135deg, #2a0f2e 0%, #431447 50%, #5b1d5c 100%)',
  'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #2c3e5a 100%)',
  'linear-gradient(135deg, #1a1423 0%, #2d1b36 50%, #402749 100%)',
  'linear-gradient(135deg, #10002b 0%, #240046 50%, #3c096c 100%)'
];

export function coverGradient(index: number): string {
  return coverGradients[index % coverGradients.length];
}

export const projects: Project[] = [
  {
    title: "Sibyl",
    stack: ["React", "FastAPI", "PostgreSQL", "pgvector", "SSE"],
    date: "Mar 2026",
    detail: "1st place & Best Use of AI/ML at Hack for Humanity — an AI auditor that fact-checks corporate sustainability reports against satellite, legal, news, and academic evidence.",
    link: "https://devpost.com/software/sibyl-x8gpor",
    github: "https://github.com/HackForHumanity2026/Sibyl",
    image: "/images/projects/sibyl.png"
  },
  {
    title: "Rosetta",
    stack: ["React", "FastAPI", "PostgreSQL", "RAG"],
    date: "Jan 2026",
    detail: "3rd place at HackHive - live lecture translation platform with RAG pipeline and real-time contextual citations.",
    link: "https://devpost.com/software/rosetta-hq6aby",
    github: "https://github.com/AbeerDas/Rosetta-HackHive",
    image: "/images/projects/rosetta.png"
  },
  {
    title: "BetterKaraoke",
    stack: ["React Native", "Expo", "Expo AV"],
    date: "Aug 2025",
    detail: "Sing your heart out with friends in real-time multiplayer karaoke.",
    link: "https://github.com/tawsifrm/BetterKaraoke",
    github: "https://github.com/tawsifrm/BetterKaraoke",
    image: "/images/projects/betterkaraoke.png"
  },
  {
    title: "TerraCustos",
    stack: ["React", "Mapbox", "Supabase", "GraphQL"],
    date: "Jan 2025",
    detail: "Track disasters as they happen on an interactive global map.",
    link: "https://github.com/tawsifrm/OEC2025",
    github: "https://github.com/tawsifrm/OEC2025",
    image: "/images/projects/terracustos.png"
  },
  {
    title: "Dynamic World Generation - WEC",
    stack: ["Python", "Turtle", "BFS"],
    date: "Jul 2024",
    detail: "1st place algorithm that builds and navigates worlds on the fly.",
    link: "https://github.com/tawsifrm/WEC-2024",
    github: "https://github.com/tawsifrm/WEC-2024",
    image: "/images/projects/wec.png"
  },
  {
    title: "Bricks Be Gone",
    stack: ["Java", "XML", "Android Studio"],
    date: "Jan 2024",
    detail: "Classic brick breaker with a modern Android twist.",
    link: "https://github.com/tawsifrm/Bricks-Be-Gone",
    github: "https://github.com/tawsifrm/Bricks-Be-Gone",
    image: "/images/projects/bricks.png"
  }
];
