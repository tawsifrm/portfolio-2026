<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { projects, coverGradient } from '$lib/data/projects';

  let carousel: HTMLDivElement;
  let viewport: HTMLDivElement;
  let track: HTMLDivElement;
  let pagination: HTMLDivElement;

  let state = $state({
    index: 0,
    pos: 0,
    width: 0,
    height: 0,
    gap: 30,
    dragging: false,
    pointerId: null as number | null,
    x0: 0,
    startPos: 0,
    v: 0,
    xLast: 0,
    tLast: 0,
    animating: false,
    animationRafId: 0
  });

  let opts = {
    gap: 30,
    peek: 0.19,
    rotateY: 30,
    zDepth: 130,
    scaleDrop: 0.1,
    blurMax: 1.6,
    activeLeftBias: 0, // 0 = active card centered (peeks of both neighbours)
    transitionMs: 520,
    breakpoints: [
      { mq: '(max-width: 1120px)', gap: 24, peek: 0.16, rotateY: 26, zDepth: 110, scaleDrop: 0.09 }
    ]
  };

  let slideW = 640;
  let isFF = false;
  let ro: ResizeObserver;
  let mediaQueries: { mq: MediaQueryList; handler: () => void }[] = [];

  const n = projects.length;

  function mod(i: number, n: number): number {
    return ((i % n) + n) % n;
  }

  // Shortest wrapped target so the carousel always loops the short way round.
  function nearest(from: number, target: number): number {
    let d = target - Math.round(from);
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return Math.round(from) + d;
  }

  function measure() {
    if (!viewport || !carousel || !pagination) return;

    const viewRect = viewport.getBoundingClientRect();
    const rootRect = carousel.getBoundingClientRect();
    const pagRect = pagination.getBoundingClientRect();
    const bottomGap = Math.max(12, Math.round(rootRect.bottom - pagRect.bottom));
    const pagSpace = pagRect.height + bottomGap;
    const availH = viewRect.height - pagSpace;
    const cardH = Math.max(360, Math.min(640, Math.round(availH)));

    state.width = viewRect.width;
    state.height = viewRect.height;
    state.gap = opts.gap;
    // JS owns the slide width so transform math matches the rendered card width.
    // Narrower than the stage so a peek of both neighbours shows.
    slideW = Math.min(720, Math.round(state.width * (1 - opts.peek * 2)));

    carousel.style.setProperty('--mzaC-slideW', `${slideW}px`);
    carousel.style.setProperty('--mzaPagH', `${pagSpace}px`);
    carousel.style.setProperty('--mzaCardH', `${cardH}px`);
  }

  function render(markActive = false) {
    if (!track) return;

    const slides = track.querySelectorAll('.mzaCarousel-slide');
    const span = slideW + state.gap;

    for (let i = 0; i < n; i++) {
      let d = i - state.pos;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;

      const weight = Math.max(0, 1 - Math.abs(d) * 2);
      const biasActive = -slideW * opts.activeLeftBias * weight;
      const tx = d * span + biasActive;
      const depth = -Math.abs(d) * opts.zDepth;
      const rot = -d * opts.rotateY;
      const scale = 1 - Math.min(Math.abs(d) * opts.scaleDrop, 0.42);
      const blur = Math.min(Math.abs(d) * opts.blurMax, opts.blurMax);
      const z = Math.round(1000 - Math.abs(d) * 10);

      const s = slides[i] as HTMLElement;
      if (!s) continue;

      if (isFF) {
        s.style.transform = `translate(${tx}px,-50%) scale(${scale})`;
        s.style.filter = 'none';
      } else {
        s.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`;
        s.style.filter = `blur(${blur}px)`;
      }
      s.style.zIndex = String(z);

      if (markActive) {
        s.dataset.state = Math.round(state.index) === i ? 'active' : 'rest';
      }
    }
  }

  function goTo(i: number, animate = true) {
    if (state.animationRafId) {
      cancelAnimationFrame(state.animationRafId);
      state.animationRafId = 0;
    }

    const start = state.pos;
    const end = nearest(start, i);
    const dur = animate ? opts.transitionMs : 0;
    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 3);

    state.animating = true;
    state.index = mod(i, n); // update index immediately so the dots track instantly

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const p = dur ? ease(t) : 1;
      state.pos = start + (end - start) * p;
      render();
      if (t < 1) {
        state.animationRafId = requestAnimationFrame(step);
      } else {
        state.animationRafId = 0;
        afterSnap();
      }
    };
    state.animationRafId = requestAnimationFrame(step);
  }

  function afterSnap() {
    state.index = mod(Math.round(state.pos), n);
    state.pos = state.index;
    state.animating = false;
    render(true);
  }

  function prev() {
    goTo(mod(state.index - 1, n));
  }

  function next() {
    goTo(mod(state.index + 1, n));
  }

  function onDragStart(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    // Let clicks on links/buttons through without starting a drag.
    const target = e.target as HTMLElement;
    if (target.closest('a, button')) return;

    e.preventDefault();

    if (state.animationRafId) {
      cancelAnimationFrame(state.animationRafId);
      state.animationRafId = 0;
      state.animating = false;
    }

    state.dragging = true;
    state.pointerId = e.pointerId;
    viewport?.setPointerCapture(e.pointerId);
    state.x0 = e.clientX;
    state.startPos = state.pos;
    state.xLast = e.clientX;
    state.tLast = performance.now();
    state.v = 0;
  }

  function onDragMove(e: PointerEvent) {
    if (!state.dragging || e.pointerId !== state.pointerId) return;

    const now = performance.now();
    const dt = Math.max(1, now - state.tLast);
    state.v = (e.clientX - state.xLast) / dt; // instantaneous velocity (px/ms)
    state.xLast = e.clientX;
    state.tLast = now;

    const dx = e.clientX - state.x0;
    const span = slideW + state.gap;
    state.pos = mod(state.startPos - dx / span, n);
    render();
  }

  function onDragEnd(e: PointerEvent | null) {
    if (!state.dragging || (e && e.pointerId !== state.pointerId)) return;
    state.dragging = false;

    try {
      if (state.pointerId != null) viewport?.releasePointerCapture(state.pointerId);
    } catch {}

    state.pointerId = null;

    // Project a little momentum, then snap — but never fling more than one slide
    // past where the drag ended, so it always feels controlled.
    const span = slideW + state.gap;
    const velSlides = state.v / span;
    const projected = state.pos - velSlides * 150;
    const base = Math.round(state.pos);
    let target = Math.round(projected);
    if (target > base + 1) target = base + 1;
    if (target < base - 1) target = base - 1;

    goTo(mod(target, n));
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  onMount(() => {
    if (typeof window === 'undefined') return;

    isFF = typeof (window as any).InstallTrigger !== 'undefined';

    if (isFF) {
      opts.rotateY = 10;
      opts.zDepth = 0;
      opts.blurMax = 0;
    }

    ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(viewport);

    opts.breakpoints.forEach((bp) => {
      const mq = window.matchMedia(bp.mq);
      const handler = () => {
        if (mq.matches) {
          Object.keys(bp).forEach((k) => {
            if (k !== 'mq') (opts as any)[k] = (bp as any)[k];
          });
          measure();
          render();
        }
      };
      mq.addEventListener('change', handler);
      mediaQueries.push({ mq, handler });
      if (mq.matches) handler();
    });

    measure();
    // Paint the initial layout synchronously so there's no flash of
    // unpositioned slides before the first animation frame.
    state.pos = 0;
    state.index = 0;
    render(true);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;

    if (state.animationRafId) cancelAnimationFrame(state.animationRafId);
    if (ro) ro.disconnect();

    mediaQueries.forEach(({ mq, handler }) => {
      mq.removeEventListener('change', handler);
    });
  });
</script>

<!-- Fully operable via the arrow buttons and pagination dots below; pointer
     drag and arrow-key nav on the region are progressive enhancements. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  bind:this={carousel}
  class="mzaCarousel"
  role="region"
  aria-roledescription="carousel"
  aria-label="Featured projects"
  onkeydown={onKeydown}
>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={viewport}
    class="mzaCarousel-viewport"
    tabindex="0"
    onpointerdown={onDragStart}
    onpointermove={onDragMove}
    onpointerup={onDragEnd}
    onpointercancel={(e) => onDragEnd(e)}
  >
    <div bind:this={track} class="mzaCarousel-track">
      {#each projects as project, i}
        {@const hasLiveLink = !!project.link && project.link !== project.github}
        {@const cover = project.image ? `url('${project.image}'), ${coverGradient(i)}` : coverGradient(i)}
        <article
          class="mzaCarousel-slide"
          role="group"
          aria-roledescription="slide"
          aria-label="{i + 1} of {projects.length}"
          data-state={i === 0 ? 'active' : 'rest'}
        >
          <div class="mzaCard">
            <!-- Cover: image (or gradient) with title + date overlaid -->
            <div class="mzaCard-cover" style="--mzaCard-bg: {cover}">
              <div class="mzaCard-glow"></div>
              <div class="mzaCard-scrim"></div>
              <span class="mzaCard-date">{project.date}</span>
              <h3 class="mzaCard-title">{project.title}</h3>
            </div>

            <!-- Body: dark panel with description, tech and links -->
            <div class="mzaCard-body">
              <p class="mzaCard-text">{project.detail}</p>
              <div class="mzaCard-stack">
                {#each project.stack.slice(0, 4) as tech}
                  <span class="mzaCard-tag">{tech}</span>
                {/each}
                {#if project.stack.length > 4}
                  <span class="mzaCard-tag mzaCard-tag--more">+{project.stack.length - 4}</span>
                {/if}
              </div>
              <div class="mzaCard-actions">
                {#if project.github}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mzaBtn mzaBtn--secondary"
                    aria-label="View GitHub repository for {project.title}"
                  >
                    <Github class="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                {/if}
                {#if hasLiveLink}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mzaBtn"
                    aria-label="View live project {project.title}"
                  >
                    <ExternalLink class="w-4 h-4" />
                    <span>View Project</span>
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>

  <div class="mzaCarousel-controls">
    <button class="mzaCarousel-prev" onclick={prev} aria-label="Previous slide">
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button class="mzaCarousel-next" onclick={next} aria-label="Next slide">
      <ChevronRight class="w-6 h-6" />
    </button>
  </div>

  <div bind:this={pagination} class="mzaCarousel-pagination" role="tablist">
    {#each projects as _, i}
      <button
        type="button"
        class="mzaCarousel-dot"
        role="tab"
        aria-label="Go to slide {i + 1}"
        aria-selected={state.index === i}
        onclick={() => goTo(i)}
      ></button>
    {/each}
  </div>
</div>

<style>
  .mzaCarousel {
    --mzaC-fg: #f8fafc;
    --mzaC-accent: #e879f9;
    --mzaC-accent2: #a78bfa;
    --mzaC-glass: rgba(20, 20, 28, 0.96);
    --mzaC-glow: rgba(232, 121, 249, 0.4);
    --mzaC-slideW: min(640px, 82vw);
    --mzaPagH: 64px;
    --mzaCardH: clamp(380px, 62vh, 620px);

    position: relative;
    height: 72vh;
    min-height: 520px;
    max-height: 680px;
    max-width: 1040px;
    margin: 0 auto;
    padding: 0 18px;
    overflow: visible;
    contain: layout;
    touch-action: none;
  }

  .mzaCarousel-viewport {
    position: relative;
    outline: none;
    overflow: visible;
    height: 100%;
    cursor: grab;
  }

  .mzaCarousel-viewport:active {
    cursor: grabbing;
  }

  .mzaCarousel-track {
    position: relative;
    height: calc(100% - var(--mzaPagH) - max(env(safe-area-inset-bottom), 12px));
    transform-style: preserve-3d;
    perspective: 1200px;
    overflow: visible;
  }

  .mzaCarousel-slide {
    position: absolute;
    top: calc(50% + 5px);
    left: 50%;
    width: var(--mzaC-slideW);
    height: min(var(--mzaCardH), calc(100% - 50px));
    margin-left: calc(var(--mzaC-slideW) / -2);
    transform-style: preserve-3d;
    border-radius: 22px;
    will-change: transform, filter;
  }

  .mzaCard {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: var(--mzaC-glass);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* ----- Cover (top) ----- */
  .mzaCard-cover {
    position: relative;
    flex: 0 0 54%;
    min-height: 0;
    background-image: var(--mzaCard-bg);
    background-size: cover;
    background-position: center;
  }

  .mzaCard-glow {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 18% 82%, rgba(232, 121, 249, 0.22) 0%, transparent 45%),
      radial-gradient(circle at 82% 18%, rgba(96, 165, 250, 0.18) 0%, transparent 45%);
  }

  .mzaCard-scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 45%, rgba(0, 0, 0, 0.7) 100%);
  }

  .mzaCard-date {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    padding: 5px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    backdrop-filter: blur(6px);
    font-family: 'Inter', system-ui, sans-serif;
  }

  .mzaCard-title {
    position: absolute;
    left: 20px;
    right: 20px;
    bottom: 14px;
    z-index: 2;
    margin: 0;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    letter-spacing: 0.2px;
    font-size: clamp(20px, 2.3vw, 30px);
    line-height: 1.1;
    color: #fff;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
  }

  /* ----- Body (bottom, dark panel) ----- */
  .mzaCard-body {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 18px 22px;
  }

  .mzaCard-text {
    margin: 0;
    color: #cbd5e1;
    font-size: clamp(13px, 1.5vw, 15px);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mzaCard-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .mzaCard-tag {
    padding: 5px 11px;
    font-size: 12px;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
    font-weight: 500;
    color: var(--mzaC-accent);
    background: rgba(232, 121, 249, 0.1);
    border: 1px solid rgba(232, 121, 249, 0.2);
    border-radius: 20px;
  }

  .mzaCard-tag--more {
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .mzaCard-actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: auto;
    padding-top: 2px;
    pointer-events: auto;
  }

  .mzaBtn {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    border-radius: 10px;
    padding: 9px 16px;
    font-weight: 600;
    font-size: 13px;
    color: #0a0a0f;
    background: linear-gradient(135deg, #e879f9 0%, #a78bfa 100%);
    box-shadow: 0 4px 20px var(--mzaC-glow);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
  }

  .mzaBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px var(--mzaC-glow);
  }

  .mzaBtn:active {
    transform: translateY(0px);
    box-shadow: 0 3px 15px rgba(232, 121, 249, 0.25);
  }

  .mzaBtn--secondary {
    background: rgba(255, 255, 255, 0.08);
    color: var(--mzaC-fg);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: none;
  }

  .mzaBtn--secondary:hover {
    background: rgba(255, 255, 255, 0.14);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  /* ----- Controls ----- */
  .mzaCarousel-controls {
    position: absolute;
    inset: 0;
    bottom: var(--mzaPagH);
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    padding: 0 4px;
  }

  .mzaCarousel-prev,
  .mzaCarousel-next {
    pointer-events: auto;
    position: relative;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(26, 26, 36, 0.8);
    backdrop-filter: blur(8px);
    color: var(--mzaC-fg);
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  }

  .mzaCarousel-prev:hover,
  .mzaCarousel-next:hover {
    background: rgba(232, 121, 249, 0.15);
    border-color: rgba(232, 121, 249, 0.3);
  }

  .mzaCarousel-prev:active,
  .mzaCarousel-next:active {
    transform: scale(0.95);
  }

  .mzaCarousel-pagination {
    position: absolute;
    left: 0;
    right: 0;
    bottom: max(20px, env(safe-area-inset-bottom));
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    pointer-events: auto;
  }

  .mzaCarousel-dot {
    width: 11px;
    height: 11px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.2);
    border: 0;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .mzaCarousel-dot[aria-selected='true'] {
    background: linear-gradient(135deg, var(--mzaC-accent), var(--mzaC-accent2));
    transform: scale(1.35);
  }

  .mzaCarousel-dot:hover:not([aria-selected='true']) {
    background: rgba(255, 255, 255, 0.35);
  }

  .mzaCarousel-slide[data-state='active'] .mzaCard {
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 0 80px -20px rgba(232, 121, 249, 0.25);
  }
</style>
