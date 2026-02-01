<script lang="ts">
  import { navigateToSection } from '../stores/sectionStore';
  import { Button } from '../components';
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  function handleViewWork() {
    navigateToSection('projects');
  }

  function handleGetInTouch() {
    navigateToSection('contact');
  }
</script>

<section class="min-h-screen flex items-center justify-center p-4 sm:p-6 relative">
  <!-- Subtle Background Enhancement -->
  <div class="absolute inset-0 -z-10 overflow-hidden opacity-5 sm:opacity-10">
    <div class="absolute -top-32 -left-32 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full bg-accent-fuchsia blur-3xl animate-pulse-glow"></div>
    <div class="absolute -bottom-32 -right-32 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 rounded-full bg-accent-purple blur-3xl"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full bg-accent-blue blur-3xl"></div>
  </div>

  <div class="max-w-4xl mx-auto text-center">
    <!-- Profile Image with Glow Effect -->
    <div
      class="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto mb-6 md:mb-8 group"
      in:fade={{ delay: 0, duration: 500 }}
    >
      <div class="absolute -inset-2 bg-gradient-to-r from-accent-fuchsia via-accent-purple to-accent-blue rounded-full opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-500"></div>
      <picture>
        <source 
          srcset="/images/PFP-sm.webp" 
          media="(max-width: 640px)" 
          type="image/webp"
        />
        <source 
          srcset="/images/PFP-md.webp" 
          media="(max-width: 1024px)" 
          type="image/webp"
        />
        <source 
          srcset="/images/PFP-lg.webp" 
          type="image/webp"
        />
        <img
          src="/images/PFP.jpg"
          alt="Tawsif Mayaz - Computer Engineering Student"
          class="relative w-full h-full rounded-full object-cover border-4 border-white/10 shadow-glow-lg"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>

    <!-- Name Heading -->
    <h1
      class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-3 text-gradient"
      in:fly={{ y: 30, delay: 80, duration: 500, easing: quintOut }}
    >
      Tawsif Mayaz
    </h1>

    <!-- Subtitle/Title -->
    <p
      class="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 sm:mb-12"
      in:fly={{ y: 30, delay: 160, duration: 500, easing: quintOut }}
    >
      Computer Engineering Student @ University of Waterloo
    </p>

    <!-- Introduction Content -->
    <div
      class="max-w-2xl mx-auto space-y-4 sm:space-y-5 text-base sm:text-lg text-text-secondary leading-relaxed mb-8 sm:mb-12"
      in:fly={{ y: 30, delay: 240, duration: 500, easing: quintOut }}
    >
      <p>
        Hey there! 👋 I'm <span class="text-text-primary font-medium">Tawsif Mayaz</span>, a Computer Engineering student at the University of Waterloo, passionate about leveraging technology to solve real-world challenges and create impactful software solutions.
      </p>
      <p>
        With hands-on experience in <span class="text-accent-fuchsia-light font-medium">full-stack development</span>, <span class="text-accent-blue-light font-medium">firmware programming</span>, and <span class="text-accent-purple-light font-medium">game design</span>, I enjoy working on projects that bridge the gap between innovative technology and practical application.
      </p>
      <p>
        I'm always excited to learn new tools and push the boundaries of what's possible. For me, engineering is all about <span class="text-text-primary font-medium">creativity</span>, <span class="text-text-primary font-medium">curiosity</span>, and <span class="text-text-primary font-medium">collaboration</span>—and I can't wait to see what's next on this journey!
      </p>
    </div>

    <!-- CTA Buttons -->
    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-4"
      in:fly={{ y: 30, delay: 320, duration: 500, easing: quintOut }}
    >
      <Button variant="primary" size="lg" onclick={handleViewWork}>
        View My Work
      </Button>
      <Button variant="outline" size="lg" onclick={handleGetInTouch}>
        Get in Touch
      </Button>
    </div>
  </div>
</section>
