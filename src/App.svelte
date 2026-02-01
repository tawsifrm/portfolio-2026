<script lang="ts">
  import './app.css';
  import { isLoading } from './lib/stores/loadingStore';
  import { Button } from './lib/components';
</script>

<main class="min-h-screen bg-bg-primary text-text-primary">
  {#if $isLoading}
    <!-- LoadingScreen component will be added in next phase -->
    <div class="flex items-center justify-center min-h-screen">
      <p class="text-text-secondary animate-pulse-glow">Loading...</p>
    </div>
  {:else}
    <!-- Design System Test Section (to be removed in later phases) -->
    <div class="container mx-auto px-6 py-12 space-y-16">
      
      <!-- Typography Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Typography</h2>
        <div class="glass-card p-8 space-y-4">
          <h1 class="text-6xl font-display font-bold text-gradient">
            Space Grotesk Display
          </h1>
          <h2 class="text-4xl font-display font-semibold text-text-primary">
            Heading Level 2
          </h2>
          <h3 class="text-2xl font-display font-medium text-text-primary">
            Heading Level 3
          </h3>
          <p class="text-lg text-text-secondary max-w-2xl">
            This is body text using Inter font. It's designed for readability with 
            a relaxed line height of 1.7 for comfortable reading on screens.
          </p>
          <p class="text-base text-text-muted">
            This is muted text for secondary information and captions.
          </p>
        </div>
      </section>

      <!-- Color Palette Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Color Palette</h2>
        <div class="glass-card p-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Background Colors -->
            <div class="space-y-2">
              <p class="text-sm text-text-muted">Backgrounds</p>
              <div class="h-16 rounded-lg bg-bg-primary border border-border-subtle"></div>
              <p class="text-xs text-text-muted">Primary</p>
              <div class="h-16 rounded-lg bg-bg-secondary"></div>
              <p class="text-xs text-text-muted">Secondary</p>
              <div class="h-16 rounded-lg bg-bg-tertiary"></div>
              <p class="text-xs text-text-muted">Tertiary</p>
            </div>
            <!-- Accent Fuchsia -->
            <div class="space-y-2">
              <p class="text-sm text-text-muted">Fuchsia</p>
              <div class="h-16 rounded-lg bg-accent-fuchsia-light"></div>
              <p class="text-xs text-text-muted">Light</p>
              <div class="h-16 rounded-lg bg-accent-fuchsia"></div>
              <p class="text-xs text-text-muted">Default</p>
              <div class="h-16 rounded-lg bg-accent-fuchsia-dark"></div>
              <p class="text-xs text-text-muted">Dark</p>
            </div>
            <!-- Accent Purple -->
            <div class="space-y-2">
              <p class="text-sm text-text-muted">Purple</p>
              <div class="h-16 rounded-lg bg-accent-purple-light"></div>
              <p class="text-xs text-text-muted">Light</p>
              <div class="h-16 rounded-lg bg-accent-purple"></div>
              <p class="text-xs text-text-muted">Default</p>
              <div class="h-16 rounded-lg bg-accent-purple-dark"></div>
              <p class="text-xs text-text-muted">Dark</p>
            </div>
            <!-- Accent Blue -->
            <div class="space-y-2">
              <p class="text-sm text-text-muted">Blue</p>
              <div class="h-16 rounded-lg bg-accent-blue-light"></div>
              <p class="text-xs text-text-muted">Light</p>
              <div class="h-16 rounded-lg bg-accent-blue"></div>
              <p class="text-xs text-text-muted">Default</p>
              <div class="h-16 rounded-lg bg-accent-blue-dark"></div>
              <p class="text-xs text-text-muted">Dark</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Button Variants Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Button Variants</h2>
        <div class="glass-card p-8 space-y-8">
          <!-- Primary Buttons -->
          <div class="space-y-3">
            <p class="text-sm text-text-muted">Primary</p>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
          <!-- Secondary Buttons -->
          <div class="space-y-3">
            <p class="text-sm text-text-muted">Secondary</p>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" disabled>Disabled</Button>
            </div>
          </div>
          <!-- Ghost Buttons -->
          <div class="space-y-3">
            <p class="text-sm text-text-muted">Ghost</p>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="md">Medium</Button>
              <Button variant="ghost" size="lg">Large</Button>
              <Button variant="ghost" disabled>Disabled</Button>
            </div>
          </div>
          <!-- Outline Buttons -->
          <div class="space-y-3">
            <p class="text-sm text-text-muted">Outline</p>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="outline" size="sm">Small</Button>
              <Button variant="outline" size="md">Medium</Button>
              <Button variant="outline" size="lg">Large</Button>
              <Button variant="outline" disabled>Disabled</Button>
            </div>
          </div>
          <!-- Link Button -->
          <div class="space-y-3">
            <p class="text-sm text-text-muted">Link Button</p>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="primary" href="#test">Link as Button</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Glass Effects Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Glass Effects</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-card p-8 hover-lift cursor-pointer">
            <h3 class="text-xl font-display text-text-primary mb-2">Glass Card</h3>
            <p class="text-text-secondary">
              This card uses the glassmorphism effect with backdrop blur and 
              semi-transparent background. Hover to see the lift effect.
            </p>
          </div>
          <div class="glass-nav p-8 rounded-xl">
            <h3 class="text-xl font-display text-text-primary mb-2">Glass Nav</h3>
            <p class="text-text-secondary">
              A lighter glass effect optimized for navigation bars with 
              more blur and subtle borders.
            </p>
          </div>
        </div>
      </section>

      <!-- Gradient Border Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Gradient Border</h2>
        <div class="gradient-border p-8 cursor-pointer">
          <h3 class="text-xl font-display text-text-primary mb-2">Gradient Border Card</h3>
          <p class="text-text-secondary">
            Hover over this card to see the gradient border effect animate from subtle 
            to full opacity. Uses fuchsia to purple to blue gradient.
          </p>
        </div>
      </section>

      <!-- Animations Section -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Animations</h2>
        <div class="glass-card p-8">
          <div class="flex flex-wrap gap-4">
            <div class="px-6 py-3 bg-bg-tertiary rounded-xl animate-pulse-glow">
              Pulse Glow
            </div>
            <div class="px-6 py-3 bg-bg-tertiary rounded-xl overflow-hidden relative">
              <span class="relative z-10">Shimmer</span>
              <div class="absolute inset-0 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Text Gradient Demo -->
      <section class="space-y-6">
        <h2 class="text-2xl font-display text-text-secondary">Text Gradient</h2>
        <div class="glass-card p-8">
          <p class="text-5xl font-display font-bold text-gradient">
            Beautiful Gradient Text
          </p>
        </div>
      </section>

    </div>
  {/if}
</main>

