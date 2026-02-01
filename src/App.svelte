<script lang="ts">
  import './app.css';
  import { fade } from 'svelte/transition';
  import { isLoading } from './lib/stores/loadingStore';
  import { LoadingScreen, Navbar, Main } from './lib/components';
</script>

<div class="min-h-screen bg-bg-primary text-text-primary">
  {#if $isLoading}
    <div transition:fade={{ duration: 400 }}>
      <LoadingScreen />
    </div>
  {:else}
    <div transition:fade={{ duration: 400, delay: 200 }}>
      <Navbar />
      <Main />
    </div>
  {/if}
</div>

