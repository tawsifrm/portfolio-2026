<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Mail, Github, Linkedin, FileText, ExternalLink } from 'lucide-svelte';
  import { Button } from '../components';
</script>

<section class="px-4 sm:px-6 py-8 sm:py-12 md:py-16">
  <div class="max-w-3xl mx-auto w-full">
    <div class="glass-card p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-10">
      <!-- Heading -->
      <div
        class="text-center"
        in:fly={{ y: 30, duration: 500, easing: quintOut, delay: 0 }}
      >
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-4">
          Let's Connect
        </h1>
        <p class="text-base sm:text-lg md:text-xl text-text-secondary">
          I'm always open to new opportunities and collaborations
        </p>
      </div>

      <!-- Email Section -->
      <div
        class="text-center space-y-2"
        in:fly={{ y: 30, duration: 500, easing: quintOut, delay: 80 }}
      >
        <p class="text-sm text-text-muted uppercase tracking-wider">Email</p>
        <a
          href="mailto:tawsifmayaz@gmail.com"
          class="group inline-flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-text-primary hover:text-accent-fuchsia md:hover:scale-105 md:hover:translate-x-1 transition-all duration-200 touch-manipulation"
          aria-label="Send email to tawsifmayaz@gmail.com"
        >
          <Mail class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:animate-bounce" />
          <span class="break-all sm:break-normal">tawsifmayaz@gmail.com</span>
        </a>
      </div>

      <!-- Social Links Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        in:fly={{ y: 30, duration: 500, easing: quintOut, delay: 160 }}
      >
        <!-- GitHub Button -->
        <a
          href="https://github.com/tawsifrm"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card p-8 sm:p-6 flex flex-col items-center gap-3 text-center transition-all duration-200 md:hover:border-accent-fuchsia/30 md:hover:shadow-glow-md md:hover:scale-[1.03] md:hover:rotate-1 group will-change-transform touch-manipulation"
          aria-label="Visit my GitHub profile"
        >
          <Github class="w-10 h-10 sm:w-8 sm:h-8 text-text-secondary group-hover:text-accent-fuchsia md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-200" />
          <div>
            <p class="font-medium text-text-primary group-hover:text-accent-fuchsia transition-colors duration-200">GitHub</p>
            <p class="text-sm text-text-muted">tawsifrm</p>
          </div>
          <ExternalLink class="w-4 h-4 text-text-muted group-hover:text-accent-fuchsia transition-colors duration-200" />
        </a>

        <!-- LinkedIn Button -->
        <a
          href="https://www.linkedin.com/in/tawsif-mayaz-446a4b211/"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card p-8 sm:p-6 flex flex-col items-center gap-3 text-center transition-all duration-200 md:hover:border-accent-fuchsia/30 md:hover:shadow-glow-md md:hover:scale-[1.03] md:hover:rotate-1 group will-change-transform touch-manipulation"
          aria-label="Connect on LinkedIn"
        >
          <Linkedin class="w-10 h-10 sm:w-8 sm:h-8 text-text-secondary group-hover:text-accent-fuchsia md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-200" />
          <div>
            <p class="font-medium text-text-primary group-hover:text-accent-fuchsia transition-colors duration-200">LinkedIn</p>
            <p class="text-sm text-text-muted">tawsif-mayaz</p>
          </div>
          <ExternalLink class="w-4 h-4 text-text-muted group-hover:text-accent-fuchsia transition-colors duration-200" />
        </a>

        <!-- Resume Button -->
        <a
          href="/Resume-public/Tawsif_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          class="glass-card p-8 sm:p-6 flex flex-col items-center gap-3 text-center transition-all duration-200 md:hover:border-accent-fuchsia/30 md:hover:shadow-glow-md md:hover:scale-[1.03] md:hover:rotate-1 group will-change-transform touch-manipulation"
          aria-label="Download my resume"
        >
          <FileText class="w-10 h-10 sm:w-8 sm:h-8 text-text-secondary group-hover:text-accent-fuchsia md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-200" />
          <div>
            <p class="font-medium text-text-primary group-hover:text-accent-fuchsia transition-colors duration-200">Resume</p>
            <p class="text-sm text-text-muted">View PDF</p>
          </div>
          <ExternalLink class="w-4 h-4 text-text-muted group-hover:text-accent-fuchsia transition-colors duration-200" />
        </a>
      </div>
    </div>
  </div>
</section>
