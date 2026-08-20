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

<div
  class="relative group h-full"
  in:fly={{ y: 30, delay: index * 80, duration: 500, easing: quintOut }}
>
  <article
    class="glass-card relative overflow-hidden h-full flex flex-col transition-all duration-200 ease-smooth md:hover:border-accent-fuchsia/30 md:hover:shadow-glow-md md:hover:-translate-y-1 transform-gpu will-change-transform"
  >
    <!-- Cover -->
    <div
      class="relative aspect-[16/9] w-full overflow-hidden"
      style="background-image: {cover}; background-size: cover; background-position: center;"
    >
      <div class="cover-pattern absolute inset-0" aria-hidden="true"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
      <span
        class="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium text-white/90 bg-black/40 backdrop-blur-sm rounded-full border border-white/10"
      >
        {project.date}
      </span>
      <h3
        class="absolute left-4 right-4 bottom-3 text-xl sm:text-2xl font-display font-bold text-white leading-tight"
        style="text-shadow: 0 2px 12px rgba(0,0,0,0.6);"
      >
        {project.title}
      </h3>
    </div>

    <!-- Body -->
    <div class="relative z-10 flex flex-col flex-grow p-4 sm:p-5">
      <p class="text-sm text-text-secondary mb-4 line-clamp-3">{project.detail}</p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        {#each project.stack.slice(0, 4) as tech}
          <span
            class="px-2 py-0.5 text-xs font-mono text-accent-fuchsia-light bg-white/5 rounded-full border border-white/5"
          >
            {tech}
          </span>
        {/each}
        {#if project.stack.length > 4}
          <span class="px-2 py-0.5 text-xs font-mono text-text-muted bg-white/5 rounded-full">
            +{project.stack.length - 4}
          </span>
        {/if}
      </div>

      <div class="flex items-center gap-2 mt-auto pt-1">
        {#if hasLiveLink}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg text-bg-primary bg-gradient-to-r from-accent-fuchsia to-accent-purple md:hover:shadow-glow-sm active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="View live project {project.title}"
          >
            <ExternalLink class="w-4 h-4" />
            View
          </a>
        {/if}
        {#if project.github}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-text-secondary bg-white/5 border border-white/10 md:hover:text-accent-fuchsia md:hover:border-accent-fuchsia/30 active:scale-95 transition-all duration-200 touch-manipulation"
            aria-label="GitHub repository for {project.title}"
          >
            <Github class="w-4 h-4" />
            Code
          </a>
        {/if}
      </div>
    </div>
  </article>
</div>

<style>
  .cover-pattern {
    background-image:
      radial-gradient(circle at 18% 82%, rgba(232, 121, 249, 0.28) 0%, transparent 45%),
      radial-gradient(circle at 82% 18%, rgba(96, 165, 250, 0.22) 0%, transparent 45%);
  }
</style>
