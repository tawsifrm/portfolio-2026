<script lang="ts">
  import { activeSection, navigateToSection, type Section } from '../stores/sectionStore';
  import { Button } from './index';
  import { fly, fade } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Menu, X } from 'lucide-svelte';
  import { preloadSection } from '../utils/preload';

  interface NavItem {
    label: string;
    section: Section;
  }

  const navItems: NavItem[] = [
    { label: 'Home', section: 'home' },
    { label: 'Experience', section: 'experience' },
    { label: 'Projects', section: 'projects' },
    { label: 'Contact', section: 'contact' },
  ];

  let mobileMenuOpen = $state(false);

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
    if (mobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
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

  function handleNavHover(section: Section) {
    preloadSection(section);
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="fixed top-0 left-0 right-0 z-50 glass-nav" aria-label="Main navigation">
  <div class="container mx-auto px-4 sm:px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo/Brand -->
      <button
        class="font-display text-2xl font-bold text-gradient cursor-pointer hover:opacity-80 hover:scale-105 hover:rotate-[-2deg] transition-all duration-200 will-change-transform"
        onclick={handleLogoClick}
        aria-label="Go to landing page"
      >
        TM
      </button>

      <!-- Desktop Navigation Items -->
      <div class="hidden md:flex items-center gap-2">
        {#each navItems as item}
          {#if $activeSection === item.section}
            <Button
              variant="ghost"
              size="sm"
              onclick={() => handleNavClick(item.section)}
              onmouseenter={() => handleNavHover(item.section)}
            >
              <span class="text-accent-fuchsia border-b-[3px] border-accent-fuchsia pb-0.5 animate-pulse-glow">
                {item.label}
              </span>
            </Button>
          {:else}
            <Button
              variant="ghost"
              size="sm"
              onclick={() => handleNavClick(item.section)}
              onmouseenter={() => handleNavHover(item.section)}
            >
              <span class="hover:underline decoration-accent-fuchsia/50 underline-offset-4 hover:scale-105 transition-all duration-200">
                {item.label}
              </span>
            </Button>
          {/if}
        {/each}
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        class="md:hidden flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-text-primary hover:bg-accent-fuchsia/15 active:scale-95 transition-all duration-200 touch-manipulation"
        onclick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
      >
        {#if mobileMenuOpen}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Menu Overlay and Drawer -->
{#if mobileMenuOpen}
  <!-- Backdrop overlay -->
  <button
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
    transition:fade={{ duration: 200 }}
    onclick={closeMobileMenu}
    aria-label="Close menu"
  ></button>

  <!-- Slide-in drawer -->
  <div
    class="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] glass-card rounded-l-2xl border-l border-white/10 md:hidden"
    transition:fly={{ x: 300, duration: 300, easing: quintOut }}
  >
    <div class="flex flex-col h-full p-6">
      <!-- Close button -->
      <div class="flex justify-end mb-8">
        <button
          class="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg text-text-primary hover:bg-accent-fuchsia/15 active:scale-95 transition-all duration-200 touch-manipulation"
          onclick={closeMobileMenu}
          aria-label="Close menu"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation Items -->
      <nav class="flex flex-col gap-2">
        {#each navItems as item, index}
          <button
            class="flex items-center w-full min-h-[44px] px-4 py-3 rounded-xl text-left text-lg font-medium transition-all duration-200 touch-manipulation
              {$activeSection === item.section 
                ? 'text-accent-fuchsia bg-accent-fuchsia/15 border-l-4 border-accent-fuchsia' 
                : 'text-text-primary hover:bg-white/5 hover:text-accent-fuchsia'}"
            onclick={() => handleNavClick(item.section)}
            style="animation-delay: {index * 50}ms"
          >
            {item.label}
          </button>
        {/each}
      </nav>

      <!-- Bottom branding -->
      <div class="mt-auto pt-8 border-t border-white/10">
        <p class="text-sm text-text-muted text-center">© 2026 Tawsif Mayaz</p>
      </div>
    </div>
  </div>
{/if}
