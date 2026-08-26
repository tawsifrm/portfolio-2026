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

<main id="main-content" aria-label="Main content" class="flex min-h-screen flex-col">
  <div class="flex-grow pb-8 md:pb-12">
    {#key $activeSection}
      <div
        class="transform-gpu"
        in:fly={{ y: 16, duration: 360, easing: quintOut }}
        out:fade={{ duration: 180 }}
      >
        {#await loadSection($activeSection)}
          <!-- Skeleton shaped like the section that is arriving, rather than a
               generic spinner. -->
          <div class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6" aria-hidden="true">
            <div class="mb-10 h-10 w-56 rounded-lg bg-surface-1"></div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="h-56 rounded-xl border border-hairline bg-surface-1"></div>
              <div class="h-56 rounded-xl border border-hairline bg-surface-1"></div>
            </div>
          </div>
        {:then module}
          {@const Section = module.default}
          <Section />
        {:catch}
          <div class="flex min-h-screen items-center justify-center px-4">
            <div class="panel max-w-md p-6 text-center">
              <h2 class="mb-2 text-lg font-semibold text-ink">This section did not load</h2>
              <p class="text-sm text-ink-muted">
                Check your connection and reload the page to try again.
              </p>
            </div>
          </div>
        {/await}
      </div>
    {/key}
  </div>
  <Footer />
</main>
