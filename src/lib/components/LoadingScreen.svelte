<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { finishLoading } from '../stores/loadingStore';

  // Loading duration in milliseconds (2.5 seconds for tasteful timing)
  const LOADING_DURATION = 2500;

  onMount(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  });
</script>

<div
  class="fixed inset-0 min-h-screen bg-bg-primary flex items-center justify-center z-50"
  role="status"
  aria-label="Loading portfolio"
>
  <div
    class="text-center"
    in:scale={{ duration: 600, start: 0.8, opacity: 0 }}
  >
    <!-- Glow effect behind the text -->
    <div class="relative">
      <div
        class="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 animate-pulse"
        aria-hidden="true"
      ></div>
      
      <!-- Name display -->
      <h1
        class="relative text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient animate-pulse-glow"
      >
        Tawsif Mayaz.
      </h1>
    </div>

    <!-- Subtle loading indicator -->
    <div class="mt-8 flex justify-center gap-1" aria-hidden="true">
      <span class="loading-dot w-2 h-2 rounded-full bg-accent-fuchsia" style="animation-delay: 0ms;"></span>
      <span class="loading-dot w-2 h-2 rounded-full bg-accent-purple" style="animation-delay: 150ms;"></span>
      <span class="loading-dot w-2 h-2 rounded-full bg-accent-blue" style="animation-delay: 300ms;"></span>
    </div>
  </div>
</div>

<style>
  /* Scoped bounce animation for loading dots */
  .loading-dot {
    animation: loading-bounce 1s infinite;
  }

  @keyframes loading-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
</style>
