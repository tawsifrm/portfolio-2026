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

/** Cover gradients for projects without a screenshot. Neutral charcoal steps
 *  that lean faintly toward the single lavender accent, dark enough for white
 *  text. Shared by the desktop carousel and the mobile project cards so a given
 *  project always gets the same cover. */
export const coverGradients = [
  'linear-gradient(135deg, #0f1011 0%, #16171c 50%, #1e2029 100%)',
  'linear-gradient(135deg, #0d0e12 0%, #14161d 50%, #1b1e2b 100%)',
  'linear-gradient(135deg, #101114 0%, #181a21 50%, #222533 100%)',
  'linear-gradient(135deg, #0e0f11 0%, #15161a 50%, #1d1f27 100%)',
  'linear-gradient(135deg, #0f1013 0%, #17181f 50%, #20222d 100%)',
  'linear-gradient(135deg, #0c0d10 0%, #13151b 50%, #1a1d29 100%)'
];

export function coverGradient(index: number): string {
  return coverGradients[index % coverGradients.length];
}

export const projects: Project[] = [
  {
    title: "Sibyl",
    stack: ["React", "FastAPI", "PostgreSQL", "pgvector", "SSE"],
    date: "Mar 2026",
    detail: "1st place and Best Use of AI/ML at Hack for Humanity. An AI auditor that fact-checks corporate sustainability reports against satellite, legal, news, and academic evidence.",
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
