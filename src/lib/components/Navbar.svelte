<script lang="ts">
  import { activeSection, navigateToSection, type Section } from '../stores/sectionStore';
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Menu, X } from 'lucide-svelte';
  import { preloadSection } from '../utils/preload';
  import { onMount } from 'svelte';

  interface NavItem {
    label: string;
    section: Section;
  }

  const navItems: NavItem[] = [
    { label: 'Experience', section: 'experience' },
    { label: 'Projects', section: 'projects' },
    { label: 'Contact', section: 'contact' },
  ];

  let mobileMenuOpen = $state(false);
  let scrolled = $state(false);
  let sentinel = $state<HTMLElement | null>(null);

  function handleNavClick(section: Section) {
    navigateToSection(section);
    closeMobileMenu();
  }

  function handleLogoClick() {
    navigateToSection('landing');
    closeMobileMenu();
  }

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    document.body.classList.toggle('mobile-menu-open', mobileMenuOpen);
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    document.body.classList.remove('mobile-menu-open');
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  }

  /* Scroll state comes from a sentinel going out of view rather than a scroll
     listener, so nothing runs on the scroll frame. */
  onMount(() => {
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        scrolled = !entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<div bind:this={sentinel} class="absolute top-0 h-5 w-full" aria-hidden="true"></div>

<nav class="sticky top-0 left-0 right-0 z-50 site-nav" class:scrolled aria-label="Main navigation">
  <div class="container mx-auto px-4 sm:px-6">
    <div class="flex h-14 items-center justify-between">
      <!-- Brand -->
      <button
        class="rounded-lg px-1 text-lg font-semibold tracking-[-0.03em] text-ink transition-colors hover:text-accent-bright"
        onclick={handleLogoClick}
        aria-label="Go to landing page"
      >
        TM
      </button>

      <!-- Desktop navigation -->
      <div class="hidden md:flex md:items-center md:gap-1">
        {#each navItems as item}
          <button
            class="nav-link"
            class:active={$activeSection === item.section}
            aria-current={$activeSection === item.section ? 'page' : undefined}
            onclick={() => handleNavClick(item.section)}
            onmouseenter={() => preloadSection(item.section)}
          >
            {item.label}
          </button>
        {/each}
      </div>

      <!-- Mobile menu trigger -->
      <button
        class="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 md:hidden touch-manipulation"
        onclick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
      >
        {#if mobileMenuOpen}
          <X class="h-5 w-5" aria-hidden="true" />
        {:else}
          <Menu class="h-5 w-5" aria-hidden="true" />
        {/if}
      </button>
    </div>
  </div>
</nav>

<!-- Mobile drawer -->
{#if mobileMenuOpen}
  <button
    class="fixed inset-0 z-40 bg-black/70 md:hidden"
    transition:fade={{ duration: 150 }}
    onclick={closeMobileMenu}
    aria-label="Close menu"
  ></button>

  <div
    class="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] overflow-y-auto overscroll-contain border-l border-hairline bg-surface-1 md:hidden"
    transition:fly={{ x: 300, duration: 240, easing: quintOut }}
  >
    <div class="flex h-full flex-col p-5">
      <div class="mb-8 flex justify-end">
        <button
          class="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 touch-manipulation"
          onclick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <nav class="flex flex-col gap-1" aria-label="Mobile navigation">
        {#each navItems as item}
          <button
            class="flex min-h-[44px] w-full items-center rounded-lg px-4 py-3 text-left text-base font-medium transition-colors touch-manipulation
              {$activeSection === item.section
                ? 'bg-surface-2 text-ink'
                : 'text-ink-muted hover:bg-surface-2 hover:text-ink'}"
            aria-current={$activeSection === item.section ? 'page' : undefined}
            onclick={() => handleNavClick(item.section)}
          >
            {item.label}
          </button>
        {/each}
      </nav>

      <div class="mt-auto border-t border-hairline pt-6">
        <p class="text-center text-sm text-ink-subtle">© 2026 Tawsif Mayaz</p>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Active state is a 1px accent rule under the label. The whole nav carries
     one accent and no decorative dots. */
  .nav-link {
    position: relative;
    padding: 8px 12px;
    border-radius: 8px;
    color: var(--ink-subtle);
    font-size: 0.875rem;
    font-weight: 500;
    transition: color var(--transition-base) var(--ease-smooth);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--ink);
  }

  .nav-link.active::after {
    content: "";
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 2px;
    height: 1px;
    background: var(--accent-bright);
  }
</style>
