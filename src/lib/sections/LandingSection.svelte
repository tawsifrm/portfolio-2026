<script lang="ts">
  import { navigateToSection, type Section } from '../stores/sectionStore';
  import { AnimatedProfileImage } from '../components';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Github, Linkedin, Mail, FileText, Briefcase, FolderKanban, MessageCircle } from 'lucide-svelte';

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

<section class="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-4 sm:py-6 lg:py-8 relative w-full">
  <div class="max-w-7xl mx-auto w-full">
    <!-- Main Content Grid: Text Left, Image Right -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      <!-- Left Column: Text Content -->
      <div class="text-center lg:text-left order-2 lg:order-1">
        <!-- Name Heading -->
        <h1
          class="text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-display font-bold mb-2"
          in:fly={{ y: 30, delay: 0, duration: 500, easing: quintOut }}
        >
          <span class="text-gradient">Tawsif</span>
          <br />
          <span class="text-text-primary">Mayaz</span>
        </h1>

        <!-- Subtitle/Title -->
        <p
          class="text-lg sm:text-xl md:text-2xl text-text-secondary mb-6"
          in:fly={{ y: 30, delay: 80, duration: 500, easing: quintOut }}
        >
          Computer Engineering @ <span class="text-accent-purple font-medium">UWaterloo</span>
        </p>

        <!-- Introduction Content -->
        <p
          class="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          in:fly={{ y: 30, delay: 160, duration: 500, easing: quintOut }}
        >
          Passionate about leveraging technology to solve real-world challenges and create impactful software solutions.
        </p>

        <!-- Social Links -->
        <div
          class="flex items-center justify-center lg:justify-start gap-3 mb-8"
          in:fly={{ y: 30, delay: 240, duration: 500, easing: quintOut }}
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
            </a>
          {/each}
        </div>

        <!-- Section Navigation -->
        <div
          class="flex flex-wrap items-center justify-center lg:justify-start gap-3"
          in:fly={{ y: 30, delay: 320, duration: 500, easing: quintOut }}
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
          <div class="w-80 h-80 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] xl:w-[600px] xl:h-[600px] relative">
            <AnimatedProfileImage 
              src="/images/new-pfp-lg.webp"
              srcSm="/images/new-pfp-sm.webp"
              srcMd="/images/new-pfp-md.webp"
              srcLg="/images/new-pfp-lg.webp"
              alt="Tawsif Mayaz - Computer Engineering Student"
            />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
