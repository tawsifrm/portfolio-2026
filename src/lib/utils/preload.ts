// Preload utility for section components
// Call this when hovering over navigation items for faster perceived navigation

export function preloadSection(section: string) {
  // Preload section component when hovering over nav item
  switch (section) {
    case 'landing':
      import('../sections/LandingSection.svelte');
      break;
    case 'home':
      import('../sections/HomeSection.svelte');
      break;
    case 'experience':
      import('../sections/ExperienceSection.svelte');
      break;
    case 'projects':
      import('../sections/ProjectsSection.svelte');
      break;
    case 'contact':
      import('../sections/ContactSection.svelte');
      break;
  }
}
