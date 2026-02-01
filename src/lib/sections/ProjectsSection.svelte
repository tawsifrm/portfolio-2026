<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { onMount, onDestroy } from 'svelte';
  import ProjectCarousel from '$lib/components/ProjectCarousel.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { projects } from '$lib/data/projects';

  const BREAKPOINT = 1024;
  let windowWidth = $state(0);

  onMount(() => {
    // Initialize window width
    windowWidth = window.innerWidth;

    // Add resize listener
    const handleResize = () => {
      windowWidth = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  onDestroy(() => {
    // Cleanup is handled by the return statement in onMount
  });

  const isDesktop = $derived(windowWidth >= BREAKPOINT);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class="min-h-screen flex flex-col justify-center py-8 sm:py-12 md:py-16">
  <!-- Section heading -->
  <div class="text-center mb-0 md:mb-2 px-4">
    <h2
      class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient pb-2"
      in:fly={{ y: 20, duration: 400, easing: quintOut }}
    >
      Projects
    </h2>
  </div>

  <!-- Desktop: Project carousel -->
  {#if isDesktop}
    <div in:fly={{ y: 30, delay: 200, duration: 500, easing: quintOut }}>
      <ProjectCarousel />
    </div>
  {:else}
    <!-- Mobile/Tablet: Project card grid -->
    <div
      class="grid grid-cols-1 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full"
      in:fly={{ y: 30, delay: 200, duration: 500, easing: quintOut }}
    >
      {#each projects as project, index (project.title)}
        <ProjectCard {project} {index} />
      {/each}
    </div>
  {/if}
</section>
