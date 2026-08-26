<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { experiences } from '$lib/data/experiences';
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';
</script>

<section class="px-4 py-12 sm:px-6 md:px-12 md:py-16">
  <div class="mx-auto w-full max-w-7xl">
    <!-- This view is the page, so its heading is the page's h1. -->
    <div class="mb-10 md:mb-12">
      <h1
        class="mb-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl md:text-5xl"
        in:fly={{ y: 12, duration: 360, easing: quintOut }}
      >
        Experience
      </h1>
      <p
        class="max-w-2xl text-base text-ink-subtle sm:text-lg"
        in:fly={{ y: 12, delay: 80, duration: 360, easing: quintOut }}
      >
        Building impactful solutions across the stack
      </p>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
      {#each experiences as experience, index (`${experience.company}-${index}`)}
        <ExperienceCard {experience} {index} />
      {/each}
    </div>
  </div>
</section>
