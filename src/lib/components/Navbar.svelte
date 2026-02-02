<script lang="ts">
  import { activeSection, navigateToSection, type Section } from '../stores/sectionStore';
  import { Button } from './index';
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

  function handleScroll() {
    scrolled = window.scrollY > 20;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="sticky top-0 left-0 right-0 z-50 glass-nav" class:scrolled aria-label="Main navigation">
  <div class="container mx-auto px-4 sm:px-6 py-2">
    <div class="flex items-center justify-between">
      <!-- Logo/Brand -->
      <button
        class="font-display text-2xl font-bold text-gradient cursor-pointer hover:opacity-80 hover:scale-105 hover:rotate-[-2deg] transition-all duration-200 will-change-transform"
        onclick={handleLogoClick}
        aria-label="Go to landing page"
      >
        TM
      </button>

      <!-- Desktop Navigation Items with Animated Indicator -->
      <div class="hidden md:block">
        <div class="nav-container">
          {#each navItems as item, index}
            <a
              href="#{item.section}"
              class="nav-link"
              class:active={$activeSection === item.section}
              data-index={index}
              onclick={(e) => {
                e.preventDefault();
                handleNavClick(item.section);
              }}
              onmouseenter={() => handleNavHover(item.section)}
              role="button"
              tabindex="0"
              onkeydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavClick(item.section);
                }
              }}
            >
              {item.label}
            </a>
          {/each}
          <div id="nav-indicator"></div>
        </div>
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

<style>
  .nav-container {
    position: relative;
    display: flex;
    gap: 0;
  }

  .nav-link {
    position: relative;
    padding: 10px 20px;
    color: var(--text-muted);
    text-decoration: none;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: color 0.2s ease;
    cursor: pointer;
  }

  .nav-link.active {
    color: var(--text-primary);
  }

  .nav-link:hover {
    color: var(--text-primary);
  }

  /* Animated particles on hover */
  .nav-link::before,
  .nav-link::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.2s ease;
  }

  .nav-link::before {
    top: 0;
    left: 10px;
    width: 6px;
    height: 6px;
  }

  .nav-link::after {
    top: 5px;
    left: 18px;
    width: 4px;
    height: 4px;
  }

  /* Experience - Fuchsia/Purple particles */
  .nav-link[data-index="0"]::before {
    background-color: var(--accent-fuchsia);
  }

  .nav-link[data-index="0"]::after {
    background-color: var(--accent-purple);
  }

  /* Projects - Purple/Blue particles */
  .nav-link[data-index="1"]::before {
    background-color: var(--accent-purple);
  }

  .nav-link[data-index="1"]::after {
    background-color: var(--accent-blue);
  }

  /* Contact - Blue/Fuchsia particles */
  .nav-link[data-index="2"]::before {
    background-color: var(--accent-blue);
  }

  .nav-link[data-index="2"]::after {
    background-color: var(--accent-fuchsia);
  }

  .nav-link:hover::before,
  .nav-link:hover::after {
    transform: scale(1);
  }

  /* Animated indicator bar */
  #nav-indicator {
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 30px;
    height: 3px;
    background: linear-gradient(130deg, var(--accent-fuchsia), var(--accent-purple));
    border-radius: 5px;
    transition: all 0.2s ease;
    pointer-events: none;
    opacity: 0;
  }

  /* Experience hover/active */
  .nav-link[data-index="0"]:hover ~ #nav-indicator,
  .nav-link[data-index="0"].active ~ #nav-indicator {
    left: 5%;
    background: linear-gradient(130deg, var(--accent-fuchsia), var(--accent-purple));
    opacity: 1;
  }

  /* Projects hover/active */
  .nav-link[data-index="1"]:hover ~ #nav-indicator,
  .nav-link[data-index="1"].active ~ #nav-indicator {
    left: 37%;
    background: linear-gradient(130deg, var(--accent-purple), var(--accent-blue));
    opacity: 1;
  }

  /* Contact hover/active */
  .nav-link[data-index="2"]:hover ~ #nav-indicator,
  .nav-link[data-index="2"].active ~ #nav-indicator {
    left: 72%;
    background: linear-gradient(130deg, var(--accent-blue), var(--accent-fuchsia));
    opacity: 1;
  }

  /* Add glow effect when hovering */
  .nav-link:hover {
    filter: drop-shadow(0 0 8px rgba(232, 121, 249, 0.3));
  }
</style>
