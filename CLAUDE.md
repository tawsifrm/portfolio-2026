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
There is **no URL router and no scroll-based navigation**. The whole site is one page; which "page" shows is driven by the `activeSection` Svelte store (`src/lib/stores/sectionStore.ts`, type `Section = 'landing' | 'home' | 'experience' | 'projects' | 'contact'`). Navigating = calling `navigateToSection(...)` to set that store. `Main.svelte` reads it and, via `{#key $activeSection}` + `{#await loadSection(...)}`, renders exactly one section with fly/fade transitions. URLs never change; there is no deep-linking or browser back/forward integration.

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

Tailwind is **v4, CSS-first**, wired through `@tailwindcss/vite`. The single entry is `@import "tailwindcss";` at the top of `src/app.css`. **There is no `tailwind.config.js`** — v4 does not auto-load one, so all design tokens live in an **`@theme` block in `src/app.css`**. That block is the single source of truth for the custom palette and generates the utilities used throughout the markup (`text-accent-fuchsia`, `bg-bg-primary`, `text-text-secondary`, `shadow-glow-md`, `font-display`, etc.).

> History: these tokens were previously defined only in a `tailwind.config.js`, which v4 silently ignored — so every custom color/shadow/font utility was a no-op and all text rendered flat near-white. The `@theme` migration fixed that; don't reintroduce a JS config.

The layers that produce the visuals:
- **`@theme` tokens** (`--color-*`, `--font-*`, `--shadow-glow-*`, `--ease-*`) → Tailwind utilities. Add/rename a token here to expose a new utility. Opacity modifiers (`bg-accent-fuchsia/10`) work automatically.
- **Plain `:root` CSS variables** (`--bg-primary`, `--accent-fuchsia`, `--text-primary`, glass/glow/timing tokens) — a *separate* set, referenced by name in hand-written classes and component `<style>`/SVG. Keep these in sync with the `@theme` values.
- **Hand-written classes** in `src/app.css`: `.glass-card`, `.glass-nav`, `.text-gradient`, `.hover-lift`, `.gradient-border`, `animate-*` keyframes.
- **Standard Tailwind v4 utilities** and default colors (`text-red-400`, `text-gray-400`, `bg-white/5`) still work — `@theme` extends the defaults, it doesn't replace them.

To add/change a **color token**: edit the `@theme` block (for the utility) and, if hand-written CSS/components reference it by name, the matching `:root` variable too.

## Other notes
- **PWA**: `vite-plugin-pwa` (`registerType: 'autoUpdate'`) generates the service worker at build time; the app uses its own `public/manifest.json` (plugin `manifest: false`). Static assets, images (`.webp` responsive profile images), and the resume PDF live in `public/`.
- **`old portfolio/`** is a legacy React version kept in the tree but **git-ignored** — ignore it entirely; it is not part of this project and pollutes broad file/glob searches.
