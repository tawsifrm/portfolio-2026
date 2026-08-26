# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site (Tawsif Mayaz) built with **Svelte 5 + Vite 6 + TypeScript + Tailwind CSS v4**, deployed at tawsifmayaz.com.

## Commands

```bash
npm run dev        # Vite dev server (HMR)
npm run build      # Production build -> dist/ (also emits PWA service worker)
npm run preview    # Serve the production build on :4173
npm run check      # svelte-check (type-checks .svelte/.ts) + tsc on node config — the only "lint"/test gate
npm run lighthouse # Lighthouse against the running preview (:4173)
npm run analyze    # Build with mode=analyze
```

There is no test runner and no ESLint. `npm run check` is the sole automated correctness gate — run it after non-trivial changes.

## Architecture

### State-based section switching (not a router)
There is **no URL router and no scroll-based navigation**. The whole site is one page; which "page" shows is driven by the `activeSection` Svelte store (`src/lib/stores/sectionStore.ts`, type `Section = 'landing' | 'experience' | 'projects' | 'contact'`). Navigating = calling `navigateToSection(...)` to set that store. `Main.svelte` reads it and, via `{#key $activeSection}` + `{#await loadSection(...)}`, renders exactly one section with fly/fade transitions. URLs never change; there is no deep-linking or browser back/forward integration.

### Two-phase app shell
`App.svelte` gates on the `isLoading` store (`loadingStore.ts`): it shows `LoadingScreen` first, then cross-fades to `Navbar` + `Main`. The switch is time-based — `LoadingScreen` calls `finishLoading()` after a hardcoded `LOADING_DURATION` (2500ms), not on any real load event.

### Lazy-loaded sections
Section components are code-split via dynamic `import()` in **two** places that must stay in sync when adding/removing a section:
- `Main.svelte` `loadSection()` — the actual on-demand load + render.
- `src/lib/utils/preload.ts` `preloadSection()` — prefetch triggered on nav-item hover (`Navbar.svelte` `onmouseenter`).

`vite.config.ts` also force-bundles `svelte` + `lucide-svelte` into a `vendor` chunk. Icons come from `lucide-svelte`.

### Content is data, not markup
Portfolio content lives in typed arrays, consumed by the section components — **edit these to update projects/experience, not the `.svelte` files**:
- `src/lib/data/projects.ts` (`Project[]`)
- `src/lib/data/experiences.ts` (`Experience[]`)

### Import conventions
- `$lib` alias -> `src/lib` (defined in both `vite.config.ts` and would-be tsconfig paths). Components/sections are re-exported through barrels: `src/lib/components/index.ts` and `src/lib/sections/index.ts` — import from the barrel, and add new files to it.
- **Svelte 5 runes** are in use (`$state`, `$props`, etc.) — this is not a Svelte 4 codebase; don't use legacy `export let` / reactive `$:` patterns.

## Styling

Tailwind is **v4, CSS-first**, wired through `@tailwindcss/vite`. The single entry is `@import "tailwindcss";` at the top of `src/app.css`. **There is no `tailwind.config.js`** — v4 does not auto-load one, so all design tokens live in an **`@theme` block in `src/app.css`**. That block is the single source of truth for the palette and generates the utilities used throughout the markup (`text-ink`, `bg-surface-1`, `border-hairline`, `text-accent-bright`, etc.).

> History: these tokens were previously defined only in a `tailwind.config.js`, which v4 silently ignored — so every custom utility was a no-op. The `@theme` migration fixed that; don't reintroduce a JS config.

### Design direction

The visual language is adapted from **Linear**: a near-black canvas, a four-step surface ladder, hairline borders, and exactly one chromatic accent. Depth comes from the surface ladder plus 1px hairlines — **never** from glow or drop shadow. Two locks the whole site obeys:

- **COLOR lock** — one accent (lavender-blue). `--color-accent` (`#5e6ad2`) is for **CTA fills only**; `--color-accent-bright` (`#828fff`) is the accent **as text** on dark. This split is deliberate: `#5e6ad2` as text on the canvas measures 4.44:1 and fails WCAG AA, while `#828fff` measures 7.28:1. Never introduce a second chromatic family.
- **SHAPE lock** — cards/panels `rounded-xl` (12px), controls/buttons `rounded-lg` (8px), status badges `rounded-full`. Nothing else.

An earlier iteration used a fuchsia/purple/blue tri-gradient with glassmorphism and glow shadows. That was retired deliberately; don't reintroduce `shadow-glow-*`, `.glass-card`, `.text-gradient`, gradient headings, or atmospheric background orbs.

### The layers that produce the visuals

- **`@theme` tokens** (`--color-*`, `--font-*`, `--ease-*`) → Tailwind utilities. Opacity modifiers (`bg-surface-2/50`) work automatically.
- **Plain `:root` CSS variables** (`--canvas`, `--surface-1`, `--ink`, `--hairline`, `--accent`, timing tokens) — a *separate* set, referenced by name in hand-written classes and in component `<style>`/SVG blocks. Keep these in sync with the `@theme` values.
- **Hand-written classes** in `src/app.css`: `.panel` (the one card surface), `.panel-interactive`, `.site-nav`, `.focus-ring`.
- **Standard Tailwind v4 utilities** and default colors still work — `@theme` extends the defaults, it doesn't replace them.

To add/change a **color token**: edit the `@theme` block (for the utility) and, if hand-written CSS/components reference it by name, the matching `:root` variable too.

### Typography and motion

One family (**Inter**) carries both display and body; the change in voice is weight plus negative tracking, not a second family. The font is linked from `index.html`, not `@import`-ed from CSS, so the request starts with the document.

Motion is deliberately restrained (entry transitions and state feedback only): no infinite loops, no parallax, no scroll hijack. The one exception is `AnimatedProfileImage`, whose orbiting label is a SMIL `<animate>`. CSS cannot stop SMIL, so that component pauses the SVG's own timeline via `pauseAnimations()` under `prefers-reduced-motion`. Keep that in place if you touch it.

## Other notes
- **PWA**: `vite-plugin-pwa` (`registerType: 'autoUpdate'`) generates the service worker at build time; the app uses its own `public/manifest.json` (plugin `manifest: false`). Static assets, images (`.webp` responsive profile images), and the resume PDF live in `public/`.
- **`old portfolio/`** is a legacy React version kept in the tree but **git-ignored** — ignore it entirely; it is not part of this project and pollutes broad file/glob searches.
