<script lang="ts">
  import './app.css';
  import { fade } from 'svelte/transition';
  import { isLoading } from './lib/stores/loadingStore';
  import { LoadingScreen, Navbar, Main, SkipLink } from './lib/components';
</script>

<SkipLink />

<div class="min-h-screen bg-canvas text-ink">
  {#if $isLoading}
    <div transition:fade={{ duration: 200 }}>
      <LoadingScreen />
    </div>
  {:else}
    <div transition:fade={{ duration: 200 }}>
      <Navbar />
      <Main />
    </div>
  {/if}
</div>
