<script lang="ts">
  import { onMount } from 'svelte';
  import { finishLoading } from '../stores/loadingStore';

  /* This screen used to hold the page for a hardcoded 2500ms, which put a floor
     under LCP that no amount of bundle work could beat. It now resolves on real
     readiness — web fonts settled — with MIN_VISIBLE so it cannot flash, and
     MAX_WAIT so a slow font CDN can never hold the content hostage. */
  const MIN_VISIBLE = 320;
  const MAX_VISIBLE = 900;

  onMount(() => {
    // Anyone who has asked for reduced motion gets the content immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishLoading();
      return;
    }

    const start = performance.now();
    let done = false;
    const release = () => {
      if (done) return;
      done = true;
      finishLoading();
    };

    const settle = () => {
      const held = performance.now() - start;
      timer = window.setTimeout(release, Math.max(0, MIN_VISIBLE - held));
    };

    let timer = window.setTimeout(release, MAX_VISIBLE);
    const ready = document.fonts?.ready;
    if (ready) {
      ready.then(() => {
        window.clearTimeout(timer);
        settle();
      });
    }

    return () => window.clearTimeout(timer);
  });
</script>

<div
  class="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas"
  role="status"
  aria-label="Loading…"
>
  <p class="text-2xl font-semibold tracking-[-0.03em] text-ink">Tawsif Mayaz</p>

  <!-- Hairline track with an accent sweep. One accent, no glow, no gradient. -->
  <div class="h-px w-40 overflow-hidden bg-hairline" aria-hidden="true">
    <div class="sweep h-full w-full bg-accent-bright"></div>
  </div>
</div>

<style>
  .sweep {
    transform-origin: left center;
    animation: sweep 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes sweep {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @media (prefers-reduced-motion: reduce) {
    .sweep {
      animation: none;
      transform: scaleX(1);
    }
  }
</style>
