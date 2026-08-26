<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Mail, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-svelte';

  interface Destination {
    icon: typeof Github;
    label: string;
    detail: string;
    href: string;
    aria: string;
  }

  const destinations: Destination[] = [
    {
      icon: Github,
      label: 'GitHub',
      detail: 'tawsifrm',
      href: 'https://github.com/tawsifrm',
      aria: 'Visit my GitHub profile'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      detail: 'tawsif-mayaz',
      href: 'https://www.linkedin.com/in/tawsif-mayaz/',
      aria: 'Connect on LinkedIn'
    },
    {
      icon: FileText,
      label: 'Resume',
      detail: 'View PDF',
      href: '/Resume-public/Tawsif_Resume.pdf',
      aria: 'View my resume'
    }
  ];
</script>

<section class="px-4 py-12 sm:px-6 md:py-16">
  <div class="mx-auto w-full max-w-2xl">
    <div class="mb-10" in:fly={{ y: 12, duration: 360, easing: quintOut }}>
      <h1 class="mb-3 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl md:text-5xl">
        Let&rsquo;s Connect
      </h1>
      <p class="text-base text-ink-subtle sm:text-lg">
        I&rsquo;m always open to new opportunities and collaborations
      </p>
    </div>

    <!-- Primary route: email. The one accent fill on the page. -->
    <a
      href="mailto:tawsifmayaz@gmail.com"
      class="panel mb-6 flex items-center gap-4 p-5 transition-colors hover:border-hairline-strong hover:bg-surface-2 touch-manipulation"
      in:fly={{ y: 12, delay: 60, duration: 360, easing: quintOut }}
      aria-label="Send email to tawsifmayaz@gmail.com"
    >
      <span
        class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-white"
        aria-hidden="true"
      >
        <Mail class="h-5 w-5" />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block text-sm text-ink-subtle">Email</span>
        <span class="block truncate text-base font-medium text-ink sm:text-lg">
          tawsifmayaz@gmail.com
        </span>
      </span>
      <ArrowUpRight class="h-5 w-5 flex-shrink-0 text-ink-subtle" aria-hidden="true" />
    </a>

    <!-- Secondary routes as rows in one panel, divided by hairlines, rather
         than three identical side-by-side cards. -->
    <div class="panel overflow-hidden" in:fly={{ y: 12, delay: 120, duration: 360, easing: quintOut }}>
      {#each destinations as dest, i}
        <a
          href={dest.href}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2 touch-manipulation
            {i > 0 ? 'border-t border-hairline' : ''}"
          aria-label={dest.aria}
        >
          <dest.icon class="h-5 w-5 flex-shrink-0 text-ink-subtle" aria-hidden="true" />
          <span class="min-w-0 flex-1">
            <span class="block text-sm font-medium text-ink">{dest.label}</span>
            <span class="block truncate text-sm text-ink-subtle">{dest.detail}</span>
          </span>
          <ArrowUpRight class="h-4 w-4 flex-shrink-0 text-ink-subtle" aria-hidden="true" />
        </a>
      {/each}
    </div>
  </div>
</section>
