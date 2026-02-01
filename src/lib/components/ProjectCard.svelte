<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Github, ExternalLink } from 'lucide-svelte';
  import type { Project } from '$lib/data/projects';

  interface Props {
    project: Project;
    index: number;
  }

  let { project, index }: Props = $props();
</script>

<div
  class="relative group"
  in:fly={{ y: 30, delay: index * 80, duration: 500, easing: quintOut }}
>
  <div
    class="glass-card relative overflow-hidden p-4 sm:p-5 md:p-6 h-full flex flex-col transition-all duration-200 ease-smooth md:hover:border-accent-fuchsia/30 md:hover:shadow-glow-md md:hover:scale-[1.02] md:hover:-translate-y-1 transform-gpu will-change-transform"
  >
    <!-- Gradient overlay on hover -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-accent-fuchsia/5 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
    ></div>

    <div class="relative z-10 flex flex-col h-full">
      <!-- Header with title and links -->
      <div class="flex justify-between items-start mb-4">
        <h3
          class="text-lg sm:text-xl font-bold text-accent-fuchsia md:group-hover:text-accent-fuchsia-light transition-colors duration-250"
        >
          {project.title}
        </h3>
        <div class="flex space-x-1 sm:space-x-3">
          {#if project.github}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 text-gray-400 hover:text-accent-fuchsia md:hover:scale-110 md:hover:rotate-12 transition-all duration-200 touch-manipulation"
              aria-label="GitHub Repository"
            >
              <Github class="w-6 h-6 sm:w-5 sm:h-5" />
            </a>
          {/if}
          {#if project.link}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 text-gray-400 hover:text-accent-fuchsia md:hover:scale-110 md:hover:rotate-12 transition-all duration-200 touch-manipulation"
              aria-label="View Project"
            >
              <ExternalLink class="w-6 h-6 sm:w-5 sm:h-5" />
            </a>
          {/if}
        </div>
      </div>

      <!-- Date badge -->
      <span
        class="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-accent-fuchsia bg-accent-fuchsia/10 rounded-full mb-4 w-fit"
      >
        {project.date}
      </span>

      <!-- Description -->
      <p class="text-sm sm:text-base text-text-secondary mb-4 line-clamp-3 flex-grow">
        {project.detail}
      </p>

      <!-- Tech stack -->
      <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-2">
        {#each project.stack.slice(0, 4) as tech}
          <span
            class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-mono text-accent-fuchsia-light bg-white/5 rounded-full border border-white/5"
          >
            {tech}
          </span>
        {/each}
        {#if project.stack.length > 4}
          <span
            class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-full"
          >
            +{project.stack.length - 4} more
          </span>
        {/if}
      </div>
    </div>

    <!-- Animated border bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-fuchsia to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
    ></div>
  </div>
</div>
