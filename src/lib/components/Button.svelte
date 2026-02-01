<script lang="ts">
  import type { Snippet } from 'svelte';
  
  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    href?: string;
    onclick?: (event: MouseEvent) => void;
    class?: string;
    children: Snippet;
  }
  
  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    href,
    onclick,
    class: className = '',
    children
  }: Props = $props();
  
  // Base styles applied to all buttons
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium font-sans
    transition-all duration-250 ease-smooth
    focus-ring
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `.trim().replace(/\s+/g, ' ');
  
  // Variant-specific styles
  const variantStyles: Record<string, string> = {
    primary: `
      bg-gradient-to-r from-accent-fuchsia to-accent-purple-dark
      text-white
      shadow-glow-sm
      hover:shadow-glow-md hover:brightness-110 hover:scale-[1.02]
      active:scale-[0.98] active:shadow-glow-sm
    `.trim().replace(/\s+/g, ' '),
    
    secondary: `
      bg-accent-blue-dark
      text-white
      shadow-glow-blue-sm
      hover:shadow-glow-blue-md hover:brightness-110 hover:scale-[1.02]
      active:scale-[0.98] active:shadow-glow-blue-sm
    `.trim().replace(/\s+/g, ' '),
    
    ghost: `
      bg-transparent
      text-accent-fuchsia
      hover:bg-accent-fuchsia/10 hover:scale-[1.02]
      active:scale-[0.98] active:bg-accent-fuchsia/15
    `.trim().replace(/\s+/g, ' '),
    
    outline: `
      bg-transparent
      border-2 border-accent-fuchsia
      text-accent-fuchsia
      hover:bg-accent-fuchsia hover:text-white hover:scale-[1.02]
      active:scale-[0.98]
    `.trim().replace(/\s+/g, ' ')
  };
  
  // Size-specific styles
  const sizeStyles: Record<string, string> = {
    sm: 'px-4 py-2 text-sm rounded-lg gap-2',
    md: 'px-6 py-3 text-base rounded-xl gap-2.5',
    lg: 'px-8 py-4 text-lg rounded-2xl gap-3'
  };
  
  // Computed class string
  const computedClasses = $derived(
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()
  );
</script>

{#if href && !disabled}
  <a
    {href}
    class={computedClasses}
    role="button"
    aria-disabled={disabled}
    {onclick}
  >
    {@render children()}
  </a>
{:else}
  <button
    type="button"
    class={computedClasses}
    {disabled}
    {onclick}
    aria-disabled={disabled}
  >
    {@render children()}
  </button>
{/if}
