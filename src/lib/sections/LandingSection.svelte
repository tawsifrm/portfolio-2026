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
  }

  interface NavLink {
    icon: typeof Briefcase;
    label: string;
    section: Section;
  }

  const socialLinks: SocialLink[] = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/tawsifrm' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tawsif-mayaz/' },
    { icon: Mail, label: 'Email', href: 'mailto:tawsifmayaz@gmail.com' },
    { icon: FileText, label: 'Resume', href: '/Resume-public/Tawsif_Resume.pdf' },
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

<section class="relative flex min-h-[100dvh] w-full items-center justify-center px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
  <div class="mx-auto w-full max-w-7xl">
    <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">

      <!-- Left: text -->
      <div class="order-2 text-center lg:order-1 lg:text-left">
        <h1
          class="mb-3 text-5xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl lg:text-6xl xl:text-7xl"
          in:fly={{ y: 16, duration: 400, easing: quintOut }}
        >
          Tawsif Mayaz
        </h1>

        <p
          class="mb-5 text-lg text-ink-muted sm:text-xl"
          in:fly={{ y: 16, delay: 60, duration: 400, easing: quintOut }}
        >
          Computer Engineering at <span class="text-accent-bright">UWaterloo</span>
        </p>

        <p
          class="mx-auto mb-8 max-w-xl text-base leading-relaxed text-ink-subtle lg:mx-0"
          in:fly={{ y: 16, delay: 120, duration: 400, easing: quintOut }}
        >
          Distributed systems, cloud infrastructure, and a soft spot for anything that runs at 3am
          without me.
        </p>

        <!-- Socials -->
        <div
          class="mb-6 flex items-center justify-center gap-2 lg:justify-start"
          in:fly={{ y: 16, delay: 180, duration: 400, easing: quintOut }}
        >
          {#each socialLinks as link}
            <a
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              class="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline text-ink-subtle transition-colors hover:border-hairline-strong hover:bg-surface-1 hover:text-ink touch-manipulation"
              aria-label={link.label}
            >
              <link.icon size={19} aria-hidden="true" />
            </a>
          {/each}
        </div>

        <!-- Section navigation -->
        <div
          class="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          in:fly={{ y: 16, delay: 240, duration: 400, easing: quintOut }}
        >
          {#each sectionLinks as link}
            <button
              onclick={() => handleSectionClick(link.section)}
              class="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-hairline bg-surface-1 px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-hairline-strong hover:bg-surface-2 hover:text-ink touch-manipulation"
            >
              <link.icon size={16} aria-hidden="true" />
              {link.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Right: portrait -->
      <div
        class="order-1 flex justify-center lg:order-2 lg:justify-end"
        in:fade={{ duration: 450 }}
      >
        <div class="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[420px] md:w-[420px] lg:h-[480px] lg:w-[480px]">
          <AnimatedProfileImage
            src="/images/new-pfp-lg.webp"
            srcSm="/images/new-pfp-sm.webp"
            srcMd="/images/new-pfp-md.webp"
            srcLg="/images/new-pfp-lg.webp"
            alt="Tawsif Mayaz"
          />
        </div>
      </div>

    </div>
  </div>
</section>
