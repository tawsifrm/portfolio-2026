<script lang="ts">
  import './app.css';
  import { fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { isLoading } from './lib/stores/loadingStore';
  import { LoadingScreen, Navbar, Main, SkipLink, AnimatedBackground } from './lib/components';
</script>

<SkipLink />
<AnimatedBackground />

<div class="min-h-screen bg-bg-primary text-text-primary">
  {#if $isLoading}
    <div class="transform-gpu" transition:fade={{ duration: 350, easing: quintOut }}>
      <LoadingScreen />
    </div>
  {:else}
    <div class="transform-gpu" transition:fade={{ duration: 350, delay: 150, easing: quintOut }}>
      <Navbar />
      <Main />
    </div>
  {/if}
</div>

