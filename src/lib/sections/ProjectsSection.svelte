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

<section class="py-12 md:py-16">
  <!-- This view is the page, so its heading is the page's h1. -->
  <div class="mx-auto mb-8 w-full max-w-7xl px-4 sm:px-6 md:mb-10">
    <h1
      class="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl md:text-5xl"
      in:fly={{ y: 12, duration: 360, easing: quintOut }}
    >
      Projects
    </h1>
  </div>

  <!-- Desktop: Project carousel -->
  {#if isDesktop}
    <div in:fly={{ y: 12, delay: 120, duration: 360, easing: quintOut }}>
      <ProjectCarousel />
    </div>
  {:else}
    <!-- Mobile/Tablet: Project card grid -->
    <div
      class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6"
      in:fly={{ y: 12, delay: 120, duration: 360, easing: quintOut }}
    >
      {#each projects as project, index (project.title)}
        <ProjectCard {project} {index} />
      {/each}
    </div>
  {/if}
</section>
