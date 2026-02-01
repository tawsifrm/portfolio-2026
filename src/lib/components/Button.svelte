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
    transition-all duration-200 ease-smooth
    focus-ring
    will-change-transform
    transform-gpu
    min-h-[44px]
    touch-manipulation
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `.trim().replace(/\s+/g, ' ');
  
  // Variant-specific styles
  const variantStyles: Record<string, string> = {
    primary: `
      bg-gradient-to-r from-accent-fuchsia to-accent-purple-dark
      text-white
      shadow-glow-sm
      md:hover:shadow-glow-md md:hover:brightness-110 md:hover:scale-[1.03]
      active:scale-95 active:shadow-glow-sm active:brightness-95 active:translate-y-[1px]
    `.trim().replace(/\s+/g, ' '),
    
    secondary: `
      bg-accent-blue-dark
      text-white
      shadow-glow-blue-sm
      md:hover:shadow-glow-blue-md md:hover:brightness-110 md:hover:scale-[1.03]
      active:scale-95 active:shadow-glow-blue-sm active:brightness-95 active:translate-y-[1px]
    `.trim().replace(/\s+/g, ' '),
    
    ghost: `
      bg-transparent
      text-accent-fuchsia
      md:hover:bg-accent-fuchsia/15 md:hover:scale-[1.03]
      active:scale-95 active:bg-accent-fuchsia/20 active:translate-y-[1px]
    `.trim().replace(/\s+/g, ' '),
    
    outline: `
      bg-transparent
      border-2 border-accent-fuchsia
      text-accent-fuchsia
      md:hover:bg-accent-fuchsia md:hover:text-white md:hover:scale-[1.03]
      active:scale-95 active:translate-y-[1px]
    `.trim().replace(/\s+/g, ' ')
  };
  
  // Size-specific styles
  const sizeStyles: Record<string, string> = {
    sm: 'px-4 py-2.5 sm:py-2 text-sm rounded-lg gap-2',
    md: 'px-6 py-3.5 sm:py-3 text-base rounded-xl gap-2.5',
    lg: 'px-8 py-4 text-base sm:text-lg rounded-2xl gap-3'
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
