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
    title: "BetterKaraoke",
    stack: ["React Native", "Expo", "Expo AV"],
    date: "Aug 2025",
    detail: "A mobile karaoke app with React Native and Expo, supporting real-time multiplayer, lyric synchronization, scoring, and matchmaking. Implemented audio capture and mixing using Expo AV for improved synchronization precision and reduced latency.",
    link: "https://github.com/tawsifrm/BetterKaraoke",
    github: "https://github.com/tawsifrm/BetterKaraoke"
  },
  {
    title: "TerraCustos",
    stack: ["React", "Mapbox", "Supabase", "GraphQL"],
    date: "Jan 2025",
    detail: "A real-time disaster reporting and visualization application with interactive map features. Integrated Supabase for authentication and real-time data synchronization, and utilized an external GraphQL API for live disaster event data.",
    link: "https://github.com/tawsifrm/OEC2025",
    github: "https://github.com/tawsifrm/OEC2025"
  },
  {
    title: "Handwriting Recognition API",
    stack: ["C++", "OpenCV", "Boost", "RESTful API"],
    date: "Oct 2024",
    detail: "A RESTful API for handwritten text recognition. Implemented token-based authentication, rate limiting with token bucket algorithm, and endpoints for image upload and text recognition with support for JSON and plain text formats.",
    link: "https://github.com/tawsifrm/Handwriting-Recognition-API",
    github: "https://github.com/tawsifrm/Handwriting-Recognition-API"
  },
  {
    title: "PTCG Dex",
    stack: ["React Native", "Pokemon TCG API"],
    date: "Sep 2024",
    detail: "A React Native mobile app that displays Pokemon trading cards using the Pokemon TCG API. Ensured seamless cross-platform functionality with React Native CLI for both Android and iOS platforms.",
    link: "https://github.com/tawsifrm/PTCG-Dex",
    github: "https://github.com/tawsifrm/PTCG-Dex"
  },
  {
    title: "Dynamic World Generation - WEC",
    stack: ["Python", "Turtle", "BFS"],
    date: "Jul 2024",
    detail: "Secured 1st place out of 124 participants at the Waterloo Engineering Competition by developing a Python-based world generation algorithm that utilized Breadth-First Search (BFS) and Dijkstra's algorithm for efficient pathfinding. Implemented Turtle graphics for an interactive visualization of the pathfinding process.",
    link: "https://github.com/tawsifrm/WEC-2024",
    github: "https://github.com/tawsifrm/WEC-2024"
  },
  {
    title: "Bricks Be Gone",
    stack: ["Java", "XML", "Android Studio"],
    date: "Jan 2024",
    detail: "A classic brick breaker game developed for Android using Java and Android Studio. Features dynamic gameplay, collision detection, scoring system, and smooth animations.",
    link: "https://github.com/tawsifrm/Bricks-Be-Gone",
    github: "https://github.com/tawsifrm/Bricks-Be-Gone"
  }
];
