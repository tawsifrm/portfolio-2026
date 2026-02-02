<script lang="ts">
  import { navigateToSection, type Section } from '../stores/sectionStore';
  import { AnimatedProfileImage } from '../components';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Github, Linkedin, Mail, FileText, Briefcase, FolderKanban, MessageCircle, ChevronDown } from 'lucide-svelte';

  interface SocialLink {
    icon: typeof Github;
    label: string;
    href: string;
    color: string;
  }

  interface NavLink {
    icon: typeof Briefcase;
    label: string;
    section: Section;
  }

  const socialLinks: SocialLink[] = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/tawsifrm', color: 'hover:text-white hover:bg-[#333]' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/tawsifrm', color: 'hover:text-white hover:bg-[#0077b5]' },
    { icon: Mail, label: 'Email', href: 'mailto:tawsif.mayaz@uwaterloo.ca', color: 'hover:text-white hover:bg-accent-fuchsia' },
    { icon: FileText, label: 'Resume', href: '/Resume-public/Tawsif_Resume.pdf', color: 'hover:text-white hover:bg-accent-purple' },
  ];

  const sectionLinks: NavLink[] = [
    { icon: Briefcase, label: 'Experience', section: 'experience' },
    { icon: FolderKanban, label: 'Projects', section: 'projects' },
    { icon: MessageCircle, label: 'Contact', section: 'contact' },
  ];

  function handleSectionClick(section: Section) {
    navigateToSection(section);
  }
</script>

<section class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
  <!-- Animated Background Enhancement -->
  <div class="absolute inset-0 -z-10 overflow-hidden">
    <div class="absolute -top-32 -left-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-accent-fuchsia/10 blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-32 -right-32 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-full bg-accent-purple/10 blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full bg-accent-blue/10 blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
  </div>

  <div class="max-w-6xl mx-auto w-full">
    <!-- Main Content Grid: Text Left, Image Right -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      <!-- Left Column: Text Content -->
      <div class="text-center lg:text-left order-2 lg:order-1">
        <!-- Greeting Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-fuchsia/10 border border-accent-fuchsia/20 mb-6"
          in:fly={{ y: 30, delay: 0, duration: 500, easing: quintOut }}
        >
          <span class="text-2xl">👋</span>
          <span class="text-sm sm:text-base text-accent-fuchsia font-medium">Hey there, I'm</span>
        </div>

        <!-- Name Heading -->
        <h1
          class="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-display font-bold mb-4"
          in:fly={{ y: 30, delay: 80, duration: 500, easing: quintOut }}
        >
          <span class="text-gradient">Tawsif</span>
          <br />
          <span class="text-text-primary">Mayaz</span>
        </h1>

        <!-- Subtitle/Title with Icon -->
        <div
          class="flex items-center justify-center lg:justify-start gap-3 mb-6"
          in:fly={{ y: 30, delay: 160, duration: 500, easing: quintOut }}
        >
          <div class="h-px w-8 bg-gradient-to-r from-transparent to-accent-fuchsia"></div>
          <p class="text-lg sm:text-xl md:text-2xl text-text-secondary">
            Computer Engineering @ <span class="text-accent-purple font-medium">UWaterloo</span>
          </p>
          <div class="h-px w-8 bg-gradient-to-l from-transparent to-accent-purple hidden lg:block"></div>
        </div>

        <!-- Introduction Content -->
        <p
          class="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          in:fly={{ y: 30, delay: 240, duration: 500, easing: quintOut }}
        >
          Passionate about leveraging technology to solve real-world challenges and create impactful software solutions.
        </p>

        <!-- Social Links -->
        <div
          class="flex items-center justify-center lg:justify-start gap-3 mb-8"
          in:fly={{ y: 30, delay: 320, duration: 500, easing: quintOut }}
        >
          {#each socialLinks as link}
            <a
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              class="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-bg-tertiary border border-glass-border text-text-secondary transition-all duration-300 {link.color} hover:scale-110 hover:shadow-lg"
              aria-label={link.label}
            >
              <link.icon size={22} />
              <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {link.label}
              </span>
            </a>
          {/each}
        </div>

        <!-- Section Navigation -->
        <div
          class="flex flex-wrap items-center justify-center lg:justify-start gap-3"
          in:fly={{ y: 30, delay: 400, duration: 500, easing: quintOut }}
        >
          {#each sectionLinks as link}
            <button
              onclick={() => handleSectionClick(link.section)}
              class="group flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-secondary border border-glass-border text-text-secondary transition-all duration-300 hover:border-accent-fuchsia/50 hover:text-accent-fuchsia hover:bg-accent-fuchsia/5 hover:scale-105 active:scale-95"
            >
              <link.icon size={18} class="transition-transform group-hover:scale-110" />
              <span class="font-medium">{link.label}</span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Right Column: Animated Profile Image -->
      <div
        class="flex justify-center lg:justify-end order-1 lg:order-2"
        in:fade={{ delay: 0, duration: 600 }}
      >
        <div class="relative">
          <!-- Decorative ring -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-accent-fuchsia via-accent-purple to-accent-blue opacity-20 blur-xl scale-110 animate-pulse"></div>
          <div class="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] relative">
            <AnimatedProfileImage 
              src="/images/new pfp.jpeg"
              alt="Tawsif Mayaz - Computer Engineering Student"
            />
          </div>
        </div>
      </div>

    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      in:fade={{ delay: 600, duration: 500 }}
    >
      <span class="text-sm">Scroll to explore</span>
      <ChevronDown size={24} class="animate-bounce" />
    </div>
  </div>
</section>
