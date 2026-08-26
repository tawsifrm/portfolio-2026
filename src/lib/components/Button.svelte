<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
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

  const baseStyles = `
    inline-flex items-center justify-center
    font-medium
    rounded-lg
    transition-colors duration-200
    focus-ring
    min-h-[44px]
    touch-manipulation
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `.trim().replace(/\s+/g, ' ');

  /* One accent across every variant. Depth is the surface ladder plus a
     hairline — no glow shadows, no gradient fills. `active:` keeps the
     tactile press without a scale transform fighting the layout. */
  const variantStyles: Record<string, string> = {
    primary: 'bg-accent text-white hover:bg-accent-bright active:bg-accent-deep',
    secondary:
      'bg-surface-1 text-ink border border-hairline hover:bg-surface-2 hover:border-hairline-strong active:bg-surface-3',
    ghost: 'bg-transparent text-accent-bright hover:bg-surface-1 active:bg-surface-2'
  };

  // Radius is locked at the base class (controls are 8px), so size only sets
  // padding and type scale.
  const sizeStyles: Record<string, string> = {
    sm: 'px-3.5 py-2 text-sm gap-2',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  const computedClasses = $derived(
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()
  );
</script>

{#if href && !disabled}
  <!-- A real link keeps link semantics: no role="button", no tabindex. -->
  <a {href} class={computedClasses} {onclick}>
    {@render children()}
  </a>
{:else}
  <button type="button" class={computedClasses} {disabled} {onclick}>
    {@render children()}
  </button>
{/if}
