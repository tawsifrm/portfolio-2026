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

<div class="h-full" in:fly={{ y: 16, delay: index * 60, duration: 400, easing: quintOut }}>
  <div class="panel panel-interactive flex h-full flex-col p-5 sm:p-6">
    <!-- Header: logo + company/role -->
    <div class="mb-4 flex items-start gap-4">
      <div
        class="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5"
      >
        {#if experience.logo && logoOk}
          <img
            src={experience.logo}
            alt="{experience.company} logo"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-contain"
          />
        {:else}
          <span class="text-base font-semibold text-accent-deep">{initials}</span>
        {/if}
      </div>

      <div class="min-w-0 flex-1">
        <h2 class="text-base font-semibold tracking-[-0.02em] text-ink sm:text-lg">
          {experience.company}
        </h2>
        <!-- The role is a subtitle for the company, not a nested section, so it
             is a paragraph rather than a heading. -->
        <p class="text-sm text-ink-muted">{experience.title}</p>
      </div>
    </div>

    <!-- Meta row -->
    <div class="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-subtle">
      <span class="rounded-full border border-hairline bg-surface-2 px-2.5 py-1 font-medium">
        {experience.date}
      </span>
      <span class="inline-flex items-center gap-1">
        <MapPin class="h-3.5 w-3.5" />
        {experience.location}
      </span>
    </div>

    <!-- Detail bullets -->
    <ul class="mb-5 space-y-2.5">
      {#each experience.details as detail}
        <li class="flex gap-3 text-sm leading-relaxed text-ink-muted">
          <span
            class="mt-[0.6em] h-1 w-1 flex-shrink-0 rounded-full bg-ink-tertiary"
            aria-hidden="true"
          ></span>
          <span>{detail}</span>
        </li>
      {/each}
    </ul>

    <!-- Tech stack -->
    <div class="mt-auto flex flex-wrap gap-1.5">
      {#each experience.stack as tech}
        <span
          class="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-ink-subtle"
        >
          {tech}
        </span>
      {/each}
    </div>
  </div>
</div>
