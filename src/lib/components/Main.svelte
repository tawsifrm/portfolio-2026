<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { activeSection } from '../stores/sectionStore';
  import { Footer } from '../components';
  
  // Dynamic imports for code splitting - sections load on demand
  const loadSection = (section: string) => {
    switch (section) {
      case 'landing':
        return import('../sections/LandingSection.svelte');
      case 'home':
        return import('../sections/HomeSection.svelte');
      case 'experience':
        return import('../sections/ExperienceSection.svelte');
      case 'projects':
        return import('../sections/ProjectsSection.svelte');
      case 'contact':
        return import('../sections/ContactSection.svelte');
      default:
        return import('../sections/LandingSection.svelte');
    }
  };
</script>

<main id="main-content" aria-label="Main content" class="pt-16 md:pt-20 min-h-screen flex flex-col">
  <div class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
    {#key $activeSection}
      <div
        class="transform-gpu"
        in:fly={{ y: 30, duration: 500, easing: quintOut }}
        out:fade={{ duration: 300, easing: quintOut }}
      >
        {#await loadSection($activeSection)}
          <!-- Loading skeleton while section loads -->
          <div class="min-h-screen flex items-center justify-center">
            <div class="flex flex-col items-center gap-4">
              <div class="w-12 h-12 border-4 border-accent-fuchsia/30 border-t-accent-fuchsia rounded-full animate-spin"></div>
              <p class="text-text-muted text-sm">Loading...</p>
            </div>
          </div>
        {:then module}
          <svelte:component this={module.default} />
        {:catch error}
          <div class="min-h-screen flex items-center justify-center">
            <p class="text-red-400">Failed to load section</p>
          </div>
        {/await}
      </div>
    {/key}
  </div>
  <Footer />
</main>
