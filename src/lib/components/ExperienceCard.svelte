<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { MapPin } from 'lucide-svelte';
  import type { Experience } from '$lib/data/experiences';

  interface Props {
    experience: Experience;
    index: number;
  }

  let { experience, index }: Props = $props();

  // Show the logo only once it genuinely decodes as an image; otherwise fall
  // back to a company-initials monogram. Preloading (rather than an <img>
  // onerror) is robust to hosts that return a 200 HTML SPA-fallback for a
  // missing asset path, which would otherwise render as a broken image.
  let logoOk = $state(false);
  $effect(() => {
    logoOk = false;
    const src = experience.logo;
    if (!src) return;
    const probe = new Image();
    probe.onload = () => (logoOk = probe.naturalWidth > 0);
    probe.onerror = () => (logoOk = false);
    probe.src = src;
  });

  const initials = $derived(
    experience.company
      .split(/\s+/)
      .filter((w) => /[a-z]/i.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('')
  );
</script>

<div
  class="relative group h-full"
  in:fly={{ y: 30, delay: index * 80, duration: 500, easing: quintOut }}
>
  <div
    class="glass-card relative overflow-hidden p-5 sm:p-6 h-full flex flex-col transition-all duration-200 ease-smooth md:hover:border-accent-blue/30 md:hover:shadow-glow-blue-md md:hover:scale-[1.02] md:hover:-translate-y-1 transform-gpu will-change-transform"
  >
    <!-- Gradient overlay on hover -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
    ></div>

    <div class="relative z-10 flex flex-col h-full">
      <!-- Header: logo + company/title -->
      <div class="flex items-start gap-3 sm:gap-4 mb-3">
        <div
          class="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white ring-1 ring-white/15 shadow-md overflow-hidden flex items-center justify-center p-1.5"
        >
          {#if experience.logo && logoOk}
            <img
              src={experience.logo}
              alt="{experience.company} logo"
              class="w-full h-full object-contain"
            />
          {:else}
            <span class="font-display text-base sm:text-lg font-bold text-accent-blue-dark">
              {initials}
            </span>
          {/if}
        </div>

        <div class="min-w-0 flex-1">
          <h3
            class="text-lg sm:text-xl font-bold text-accent-blue md:group-hover:text-accent-blue-light transition-colors duration-200 leading-tight"
          >
            {experience.company}
          </h3>
          <h4 class="text-sm sm:text-base text-text-secondary">{experience.title}</h4>
        </div>
      </div>

      <!-- Meta row: date + location -->
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4">
        <span
          class="inline-block px-3 py-1 text-xs sm:text-sm font-medium text-accent-blue bg-accent-blue/10 rounded-full"
        >
          {experience.date}
        </span>
        <span class="inline-flex items-center gap-1 text-xs sm:text-sm text-text-muted">
          <MapPin class="w-3.5 h-3.5" />
          {experience.location}
        </span>
      </div>

      <!-- Detail bullet points -->
      <ul class="space-y-2 mb-5">
        {#each experience.details as detail}
          <li class="flex gap-2.5 text-sm sm:text-[15px] text-text-secondary leading-relaxed">
            <span
              class="mt-[0.5em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-blue/70"
              aria-hidden="true"
            ></span>
            <span>{detail}</span>
          </li>
        {/each}
      </ul>

      <!-- Tech stack -->
      <div class="flex flex-wrap gap-1.5 sm:gap-2 mt-auto pt-1">
        {#each experience.stack as tech}
          <span
            class="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs font-mono text-accent-blue-light bg-white/5 rounded-full border border-white/5"
          >
            {tech}
          </span>
        {/each}
      </div>
    </div>

    <!-- Animated border bottom -->
    <div
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
    ></div>
  </div>
</div>
