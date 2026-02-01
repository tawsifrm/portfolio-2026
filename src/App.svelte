<script lang="ts">
  import './app.css';
  import { isLoading } from './lib/stores/loadingStore';
  
  // Components will be imported in later phases
</script>

<main class="min-h-screen bg-gray-950 text-white">
  {#if $isLoading}
    <!-- LoadingScreen component will be added in next phase -->
    <div class="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  {:else}
    <!-- Main content will be added in next phase -->
    <div>
      <p>Main Content</p>
    </div>
  {/if}
</main>
