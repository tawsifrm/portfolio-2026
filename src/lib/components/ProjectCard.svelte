<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Github, ExternalLink } from 'lucide-svelte';
  import { coverGradient, type Project } from '$lib/data/projects';

  interface Props {
    project: Project;
    index: number;
  }

  let { project, index }: Props = $props();

  const grad = $derived(coverGradient(index));
  // Layer the screenshot over the gradient so a missing/late image degrades
  // gracefully to the on-brand gradient instead of a blank cover.
  const cover = $derived(project.image ? `url('${project.image}'), ${grad}` : grad);
  // Only show a separate "live" link when it differs from the repo.
  const hasLiveLink = $derived(!!project.link && project.link !== project.github);
</script>

<div class="h-full" in:fly={{ y: 16, delay: index * 60, duration: 400, easing: quintOut }}>
  <article class="panel panel-interactive relative flex h-full flex-col overflow-hidden">
    <!-- Cover -->
    <div
      class="relative aspect-[16/9] w-full overflow-hidden border-b border-hairline"
      style="background-image: {cover}; background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <span
        class="absolute top-3 right-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-xs font-medium text-white"
      >
        {project.date}
      </span>
    </div>

    <!-- Body -->
    <div class="flex flex-grow flex-col p-5">
      <h2 class="mb-2 text-lg font-semibold tracking-[-0.02em] text-ink">
        {project.title}
      </h2>
      <p class="mb-4 line-clamp-3 text-sm leading-relaxed text-ink-muted">{project.detail}</p>

      <div class="mb-5 flex flex-wrap gap-1.5">
        {#each project.stack.slice(0, 4) as tech}
          <span
            class="rounded-full border border-hairline bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-ink-subtle"
          >
            {tech}
          </span>
        {/each}
        {#if project.stack.length > 4}
          <span class="rounded-full px-2 py-0.5 font-mono text-xs text-ink-subtle">
            +{project.stack.length - 4}
          </span>
        {/if}
      </div>

      <div class="mt-auto flex items-center gap-2">
        {#if hasLiveLink}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-bright touch-manipulation"
            aria-label="View live project {project.title}"
          >
            <ExternalLink class="h-4 w-4" />
            View
          </a>
        {/if}
        {#if project.github}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-hairline px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink touch-manipulation"
            aria-label="GitHub repository for {project.title}"
          >
            <Github class="h-4 w-4" />
            Code
          </a>
        {/if}
      </div>
    </div>
  </article>
</div>
