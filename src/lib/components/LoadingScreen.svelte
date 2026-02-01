<script lang="ts">
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
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
    class="text-center will-change-transform transform-gpu"
    in:scale={{ duration: 500, start: 0.85, opacity: 0 }}
  >
    <!-- Glow effect behind the SVG -->
    <div class="relative">
      <div
        class="absolute inset-0 blur-[100px] opacity-30 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 animate-pulse transform-gpu"
        aria-hidden="true"
      ></div>
      
      <!-- Wave-filling text animation -->
      <svg viewBox="0 0 200 40" class="loading-svg">
        <defs>
          <!-- Gradient using portfolio colors -->
          <linearGradient id="wave-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--accent-fuchsia)" />
            <stop offset="50%" stop-color="var(--accent-purple)" />
            <stop offset="100%" stop-color="var(--accent-blue)" />
          </linearGradient>
          
          <!-- Wave pattern -->
          <pattern
            id="wave"
            x="0"
            y="0"
            width="120"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              id="wavePath"
              d="M-40 24 Q-30 20 -20 24 T0 24 T20 24 T40 24 T60 24 T80 24 T100 24 T120 24 V40 H-40z"
              fill="url(#wave-gradient)"
            >
              <animateTransform
                attributeName="transform"
                begin="0s"
                dur="1.5s"
                type="translate"
                from="0,0"
                to="40,0"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
        </defs>
        
        <!-- Main animated text with wave fill -->
        <text
          text-anchor="middle"
          x="100"
          y="30"
          font-size="24"
          font-weight="bold"
          fill="url(#wave)"
          fill-opacity="0.9"
          class="loading-text"
        >
          Tawsif Mayaz
        </text>
        
        <!-- Background text for depth -->
        <text
          text-anchor="middle"
          x="100"
          y="30"
          font-size="24"
          font-weight="bold"
          fill="url(#wave-gradient)"
          fill-opacity="0.15"
          class="loading-text"
        >
          Tawsif Mayaz
        </text>
      </svg>
    </div>
  </div>
</div>

<style>
  .loading-svg {
    max-width: 700px;
    width: 90vw;
    height: auto;
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }

  .loading-text {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    letter-spacing: 0.1em;
  }

  /* Responsive sizing */
  @media (min-width: 768px) {
    .loading-svg {
      max-width: 800px;
    }
  }

  @media (min-width: 1024px) {
    .loading-svg {
      max-width: 900px;
    }
  }
</style>
