<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = $state(false);
  
  onMount(() => {
    mounted = true;
  });
</script>

<div class="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
  <!-- Animated gradient orbs -->
  <div 
    class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-fuchsia/10 blur-3xl animate-pulse-slow"
  ></div>
  <div 
    class="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-accent-purple/10 blur-3xl animate-pulse-slow" 
    style="animation-delay: 1s;"
  ></div>
  <div 
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-blue/10 blur-3xl animate-pulse-slow" 
    style="animation-delay: 2s;"
  ></div>
  
  <!-- Subtle gradient mesh overlay -->
  <div class="absolute inset-0 bg-gradient-to-br from-accent-fuchsia/5 via-transparent to-accent-blue/5 opacity-50"></div>
</div>
