<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { experiences } from '$lib/data/experiences';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';
</script>

<section class="px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
  <div class="max-w-7xl mx-auto w-full">
    <!-- Section heading -->
    <div class="text-center mb-8 md:mb-12">
      <h2
        class="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-3"
        in:fly={{ y: 20, duration: 400, easing: quintOut }}
      >
        Experience
      </h2>
      <p
        class="text-base sm:text-lg md:text-xl text-text-secondary"
        in:fly={{ y: 20, delay: 100, duration: 400, easing: quintOut }}
      >
        Building impactful solutions across the stack
      </p>
    </div>

    <!-- Experience cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      {#each experiences as experience, index (`${experience.company}-${index}`)}
        <ExperienceCard {experience} {index} />
      {/each}
    </div>
  </div>
</section>
