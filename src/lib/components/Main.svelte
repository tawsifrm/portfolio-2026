<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { activeSection } from '../stores/sectionStore';
  import {
    LandingSection,
    HomeSection,
    ExperienceSection,
    ProjectsSection,
    ContactSection,
  } from '../sections';
</script>

<main class="pt-20 min-h-screen">
  <div class="container mx-auto px-6 pb-12">
    {#key $activeSection}
      <div
        in:fly={{ y: 20, duration: 300, easing: cubicOut }}
        out:fade={{ duration: 200, easing: cubicOut }}
      >
        {#if $activeSection === 'landing'}
          <LandingSection />
        {:else if $activeSection === 'home'}
          <HomeSection />
        {:else if $activeSection === 'experience'}
          <ExperienceSection />
        {:else if $activeSection === 'projects'}
          <ProjectsSection />
        {:else if $activeSection === 'contact'}
          <ContactSection />
        {/if}
      </div>
    {/key}
  </div>
</main>
