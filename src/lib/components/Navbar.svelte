<script lang="ts">
  import { activeSection, navigateToSection, type Section } from '../stores/sectionStore';
  import { Button } from './index';

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

  function handleNavClick(section: Section) {
    navigateToSection(section);
  }

  function handleLogoClick() {
    navigateToSection('landing');
  }
</script>

<nav class="fixed top-0 left-0 right-0 z-50 glass-nav">
  <div class="container mx-auto px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo/Brand -->
      <button
        class="font-display text-2xl font-bold text-gradient cursor-pointer hover:opacity-80 transition-opacity"
        on:click={handleLogoClick}
        aria-label="Go to landing page"
      >
        TM
      </button>

      <!-- Navigation Items -->
      <div class="hidden md:flex items-center gap-2">
        {#each navItems as item}
          {#if $activeSection === item.section}
            <Button
              variant="ghost"
              size="sm"
              on:click={() => handleNavClick(item.section)}
            >
              <span class="text-accent-fuchsia border-b-2 border-accent-fuchsia pb-0.5">
                {item.label}
              </span>
            </Button>
          {:else}
            <Button
              variant="ghost"
              size="sm"
              on:click={() => handleNavClick(item.section)}
            >
              {item.label}
            </Button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
</nav>
