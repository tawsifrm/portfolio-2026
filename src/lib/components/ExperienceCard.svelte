<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { Experience } from '$lib/data/experiences';

  interface Props {
    experience: Experience;
    index: number;
  }

  let { experience, index }: Props = $props();
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
      class="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
    ></div>

    <div class="relative z-10 flex flex-col h-full">
      <!-- Header with company and title -->
      <div class="mb-2">
        <h3
          class="text-lg sm:text-xl font-bold text-accent-blue md:group-hover:text-accent-blue-light transition-colors duration-250"
        >
          {experience.company}
        </h3>
        <h4 class="text-base sm:text-lg text-text-secondary">{experience.title}</h4>
      </div>

      <!-- Date badge -->
      <span
        class="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-accent-blue bg-accent-blue/10 rounded-full mb-4 w-fit"
      >
        {experience.date}
      </span>

      <!-- Description -->
      <p class="text-sm sm:text-base text-text-secondary mb-4">
        {experience.detail}
      </p>

      <!-- Tech stack -->
      <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-2">
        {#each experience.stack as tech}
          <span
            class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-mono text-accent-fuchsia-light bg-white/5 rounded-full border border-white/5"
          >
            {tech}
          </span>
        {/each}
      </div>
    </div>

    <!-- Animated border bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-250 pointer-events-none"
    ></div>
  </div>
</div>
