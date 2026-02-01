<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { projects } from '$lib/data/projects';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<section class="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12">
  <div class="max-w-7xl mx-auto w-full">
    <!-- Section heading -->
    <div class="text-center mb-8 md:mb-12">
      <h2
        class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-3"
        in:fly={{ y: 20, duration: 400, easing: quintOut }}
      >
        Projects
      </h2>
      <p
        class="text-base sm:text-lg md:text-xl text-text-secondary"
        in:fly={{ y: 20, delay: 100, duration: 400, easing: quintOut }}
      >
        Building innovative solutions with modern technologies
      </p>
    </div>

    <!-- Project cards grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {#each projects as project, index (`${project.title}-${index}`)}
        <ProjectCard {project} {index} />
      {/each}
    </div>
  </div>
</section>
