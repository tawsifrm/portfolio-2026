<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-svelte';
  import { projects, type Project } from '$lib/data/projects';

  let carousel: HTMLDivElement;
  let viewport: HTMLDivElement;
  let track: HTMLDivElement;
  let pagination: HTMLDivElement;
  let progressBar: HTMLDivElement;

  let state = $state({
    index: 0,
    pos: 0,
    width: 0,
    height: 0,
    gap: 28,
    dragging: false,
    pointerId: null as number | null,
    x0: 0,
    v: 0,
    t0: 0,
    animating: false,
    hovering: false,
    startTime: 0,
    pausedAt: 0,
    rafId: 0,
    animationRafId: 0
  });

  let opts = {
    gap: 28,
    peek: 0.15,
    rotateY: 34,
    zDepth: 150,
    scaleDrop: 0.09,
    blurMax: 2.0,
    activeLeftBias: 0.12,
    interval: 6000,
    transitionMs: 900,
    breakpoints: [
      { mq: '(max-width: 1200px)', gap: 24, peek: 0.12, rotateY: 28, zDepth: 120, scaleDrop: 0.08, activeLeftBias: 0.1 },
      { mq: '(max-width: 1000px)', gap: 18, peek: 0.09, rotateY: 22, zDepth: 90, scaleDrop: 0.07, activeLeftBias: 0.09 },
      { mq: '(max-width: 768px)', gap: 14, peek: 0.06, rotateY: 16, zDepth: 70, scaleDrop: 0.06, activeLeftBias: 0.08 },
      { mq: '(max-width: 560px)', gap: 12, peek: 0.05, rotateY: 12, zDepth: 60, scaleDrop: 0.05, activeLeftBias: 0.07 }
    ]
  };

  let slideW = 880;
  let tiltX = 0;
  let tiltY = 0;
  let isFF = false;
  let ro: ResizeObserver;
  let mediaQueries: { mq: MediaQueryList; handler: () => void }[] = [];

  const n = projects.length;

  // Generate unique gradient backgrounds for each project
  const gradientBackgrounds = [
    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
    'linear-gradient(135deg, #10002b 0%, #240046 50%, #3c096c 100%)',
    'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)',
    'linear-gradient(135deg, #1a1423 0%, #2d1b36 50%, #402749 100%)',
    'linear-gradient(135deg, #0d1321 0%, #1d2d44 50%, #3e5c76 100%)'
  ];

  function mod(i: number, n: number): number {
    return ((i % n) + n) % n;
  }

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
    const cardH = Math.max(320, Math.min(640, Math.round(availH)));
    
    state.width = viewRect.width;
    state.height = viewRect.height;
    state.gap = opts.gap;
    slideW = Math.min(880, state.width * (1 - opts.peek * 2));
    
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

      const card = s.querySelector('.mzaCard') as HTMLElement;
      if (card) {
        const parBase = Math.max(-1, Math.min(1, -d));
        const parX = parBase * 48 + tiltY * 2.0;
        const parY = tiltX * -1.5;
        const bgX = parBase * -64 + tiltY * -2.4;
        
        card.style.setProperty('--mzaParX', `${parX.toFixed(2)}px`);
        card.style.setProperty('--mzaParY', `${parY.toFixed(2)}px`);
        card.style.setProperty('--mzaParBgX', `${bgX.toFixed(2)}px`);
        card.style.setProperty('--mzaParBgY', `${(parY * 0.35).toFixed(2)}px`);
      }
    }
  }

  function renderProgress(p: number) {
    if (progressBar) {
      progressBar.style.transform = `scaleX(${p})`;
    }
  }

  function startCycle() {
    state.startTime = performance.now();
    renderProgress(0);
  }

  function loop() {
    const step = (t: number) => {
      if (!state.dragging && !state.hovering && !state.animating) {
        const elapsed = t - state.startTime;
        const p = Math.min(1, elapsed / opts.interval);
        renderProgress(p);
        if (elapsed >= opts.interval) next();
      }
      state.rafId = requestAnimationFrame(step);
    };
    state.rafId = requestAnimationFrame(step);
  }

  function goTo(i: number, animate = true) {
    // Cancel any ongoing animation
    if (state.animationRafId) {
      cancelAnimationFrame(state.animationRafId);
      state.animationRafId = 0;
    }
    
    const start = state.pos;
    const end = nearest(start, i);
    const dur = animate ? opts.transitionMs : 0;
    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);
    
    state.animating = true;
    state.index = mod(i, n); // Update index immediately for instant dot update
    
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const p = dur ? ease(t) : 1;
      state.pos = start + (end - start) * p;
      render();
      if (t < 1) {
        state.animationRafId = requestAnimationFrame(step);
      } else {
        state.animationRafId = 0;
        afterSnap(i);
      }
    };
    state.animationRafId = requestAnimationFrame(step);
  }

  function afterSnap(i: number) {
    state.index = mod(Math.round(state.pos), n);
    state.pos = state.index;
    state.animating = false;
    render(true);
    startCycle();
  }

  function prev() {
    goTo(mod(state.index - 1, n));
  }

  function next() {
    goTo(mod(state.index + 1, n));
  }

  function onTilt(e: PointerEvent) {
    if (!viewport) return;
    const r = viewport.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    tiltX = my * -6;
    tiltY = mx * 6;
  }

  function onDragStart(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    state.dragging = true;
    state.pointerId = e.pointerId;
    viewport?.setPointerCapture(e.pointerId);
    state.x0 = e.clientX;
    state.t0 = performance.now();
    state.v = 0;
    state.pausedAt = performance.now();
  }

  function onDragMove(e: PointerEvent) {
    if (!state.dragging || e.pointerId !== state.pointerId) return;
    const dx = e.clientX - state.x0;
    const dt = Math.max(16, performance.now() - state.t0);
    state.v = dx / dt;
    const slideSpan = slideW + state.gap;
    state.pos = mod(state.index - dx / slideSpan, n);
    render();
  }

  function onDragEnd(e: PointerEvent | null) {
    if (!state.dragging || (e && e.pointerId !== state.pointerId)) return;
    state.dragging = false;
    
    try {
      if (state.pointerId != null) {
        viewport?.releasePointerCapture(state.pointerId);
      }
    } catch {}
    
    state.pointerId = null;
    
    if (state.pausedAt) {
      state.startTime += performance.now() - state.pausedAt;
      state.pausedAt = 0;
    }
    
    const v = state.v;
    const threshold = 0.18;
    let target = Math.round(state.pos - Math.sign(v) * (Math.abs(v) > threshold ? 0.5 : 0));
    goTo(mod(target, n));
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  function onMouseEnter() {
    state.hovering = true;
    state.pausedAt = performance.now();
  }

  function onMouseLeave() {
    if (state.pausedAt) {
      state.startTime += performance.now() - state.pausedAt;
      state.pausedAt = 0;
    }
    state.hovering = false;
  }

  onMount(() => {
    if (typeof window === 'undefined') return;
    
    isFF = typeof (window as any).InstallTrigger !== 'undefined';
    
    if (isFF) {
      opts.rotateY = 10;
      opts.zDepth = 0;
      opts.blurMax = 0;
    }
    
    // Setup ResizeObserver
    ro = new ResizeObserver(() => {
      measure();
      render();
    });
    ro.observe(viewport);
    
    // Setup breakpoint listeners
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
    goTo(0, false);
    startCycle();
    loop();
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    
    if (state.rafId) {
      cancelAnimationFrame(state.rafId);
    }
    
    if (state.animationRafId) {
      cancelAnimationFrame(state.animationRafId);
    }
    
    if (ro) {
      ro.disconnect();
    }
    
    mediaQueries.forEach(({ mq, handler }) => {
      mq.removeEventListener('change', handler);
    });
  });
</script>

<div
  bind:this={carousel}
  class="mzaCarousel"
  role="region"
  aria-roledescription="carousel"
  aria-label="Featured projects"
  onkeydown={onKeydown}
  onmouseenter={onMouseEnter}
  onmouseleave={onMouseLeave}
>
  <div
    bind:this={viewport}
    class="mzaCarousel-viewport"
    tabindex="0"
    onpointerdown={onDragStart}
    onpointermove={(e) => { onDragMove(e); onTilt(e); }}
    onpointerup={onDragEnd}
    onpointercancel={(e) => onDragEnd(e)}
  >
    <div bind:this={track} class="mzaCarousel-track">
      {#each projects as project, i}
        <article
          class="mzaCarousel-slide"
          role="group"
          aria-roledescription="slide"
          aria-label="{i + 1} of {projects.length}"
          data-state={i === 0 ? 'active' : 'rest'}
        >
          <div
            class="mzaCard"
            style="--mzaCard-bg: {gradientBackgrounds[i % gradientBackgrounds.length]}"
          >
            <!-- Decorative tech pattern overlay -->
            <div class="mzaCard-pattern"></div>
            
            <header class="mzaCard-head mzaPar-1">
              <h3 class="mzaCard-title">{project.title}</h3>
              <p class="mzaCard-kicker">{project.date}</p>
            </header>
            
            <!-- Bottom content area -->
            <div class="mzaCard-bottom mzaPar-2">
              <!-- Left side: description and tech stack -->
              <div class="mzaCard-info">
                <p class="mzaCard-text">
                  {project.detail}
                </p>
                <div class="mzaCard-stack">
                  {#each project.stack.slice(0, 4) as tech}
                    <span class="mzaCard-tag">{tech}</span>
                  {/each}
                  {#if project.stack.length > 4}
                    <span class="mzaCard-tag mzaCard-tag--more">+{project.stack.length - 4}</span>
                  {/if}
                </div>
              </div>
              
              <!-- Right side: action buttons -->
              <div class="mzaCard-actions">
                {#if project.github}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mzaBtn mzaBtn--secondary"
                    aria-label="View GitHub repository for {project.title}"
                  >
                    <Github class="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                {/if}
                {#if project.link}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mzaBtn"
                    aria-label="View live project {project.title}"
                  >
                    <ExternalLink class="w-5 h-5" />
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
    <button
      class="mzaCarousel-prev"
      onclick={prev}
      aria-label="Previous slide"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button
      class="mzaCarousel-next"
      onclick={next}
      aria-label="Next slide"
    >
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
  :root {
    --mzaC-fg: #f8fafc;
    --mzaC-accent: #e879f9;
    --mzaC-accent2: #a78bfa;
    --mzaC-glass: rgba(26, 26, 36, 0.7);
    --mzaC-glow: rgba(232, 121, 249, 0.4);
    --mzaC-slideW: min(820px, 88vw);
    --mzaC-peek: 0.15;
    --mzaPagH: 64px;
    --mzaCardH: clamp(360px, 62vh, 600px);
  }

  .mzaCarousel {
    position: relative;
    height: 70vh;
    min-height: 480px;
    max-height: 650px;
    max-width: 100vw;
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
    transform-style: preserve-3d;
    display: grid;
    place-items: center;
    border-radius: 22px;
    overflow: hidden;
    will-change: transform, filter;
  }

  .mzaCard {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
    background: var(--mzaC-glass);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    backdrop-filter: saturate(120%) blur(4px);
    transform: translateZ(0);
    cursor: grab;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mzaCard::before {
    content: '';
    position: absolute;
    inset: -2%;
    background: var(--mzaCard-bg);
    background-size: cover;
    background-position: center;
    filter: contrast(1.02) saturate(1.08) brightness(0.9);
    transform: translateZ(-60px) scale(1.18)
      translate3d(var(--mzaParBgX, 0px), var(--mzaParBgY, 0px), 0);
    transition: transform 800ms cubic-bezier(0.2, 0.7, 0, 1),
      filter 800ms cubic-bezier(0.2, 0.7, 0, 1);
  }

  .mzaCard::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.35) 45%,
      rgba(0, 0, 0, 0.55) 100%
    );
  }

  /* Decorative tech pattern */
  .mzaCard-pattern {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.08;
    background-image: 
      radial-gradient(circle at 20% 80%, var(--mzaC-accent) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, var(--mzaC-accent2) 0%, transparent 40%),
      linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.03) 49.5%, rgba(255,255,255,0.03) 50.5%, transparent 50.5%),
      linear-gradient(0deg, transparent 49.5%, rgba(255,255,255,0.03) 49.5%, rgba(255,255,255,0.03) 50.5%, transparent 50.5%);
    background-size: 100% 100%, 100% 100%, 60px 60px, 60px 60px;
    pointer-events: none;
  }

  .mzaCard-head {
    position: absolute;
    inset: 24px auto auto 24px;
    z-index: 2;
  }

  .mzaCard-title {
    margin: 0;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-weight: 700;
    letter-spacing: 0.2px;
    font-size: clamp(22px, 3.1vw, 36px);
    text-shadow: 2px 2px 15px rgba(0, 0, 0, 0.6);
    line-height: 110%;
    cursor: text;
    color: var(--mzaC-fg);
  }

  .mzaCard-kicker {
    margin: 0.5rem 0;
    color: var(--mzaC-accent);
    font-size: clamp(12px, 1.7vw, 14px);
    font-weight: 600;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.6);
    cursor: text;
    font-family: 'Inter', system-ui, sans-serif;
  }

  .mzaCard-bottom {
    position: absolute;
    inset: auto 24px 24px 24px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 20px;
  }

  .mzaCard-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    min-width: 0;
  }

  .mzaCard-text {
    margin: 0;
    color: #cbd5e1;
    font-size: clamp(14px, 1.8vw, 16px);
    line-height: 1.5;
    cursor: text;
  }

  .mzaCard-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .mzaCard-tag {
    padding: 6px 12px;
    font-size: 12px;
    font-family: 'JetBrains Mono', 'SF Mono', monospace;
    font-weight: 500;
    color: var(--mzaC-accent);
    background: rgba(232, 121, 249, 0.1);
    border: 1px solid rgba(232, 121, 249, 0.2);
    border-radius: 20px;
    backdrop-filter: blur(4px);
  }

  .mzaCard-tag--more {
    color: #64748b;
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .mzaCard-actions {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-shrink: 0;
  }

  .mzaBtn {
    appearance: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: none;
    border-radius: 10px;
    padding: 8px 14px;
    font-weight: 600;
    font-size: 12px;
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
    background: rgba(255, 255, 255, 0.1);
    color: var(--mzaC-fg);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: none;
  }

  .mzaBtn--secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .mzaCarousel-controls {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
    padding: 0 8px;
  }

  .mzaCarousel-prev,
  .mzaCarousel-next {
    pointer-events: auto;
    position: relative;
    width: 48px;
    height: 48px;
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
    width: 12px;
    height: 12px;
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

  .mzaCarousel-progress {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: min(600px, 80%);
    height: 3px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
    overflow: hidden;
  }

  .mzaCarousel-progressBar {
    display: block;
    height: 100%;
    width: 100%;
    transform-origin: left;
    transform: scaleX(0);
    will-change: transform;
    background: linear-gradient(90deg, var(--mzaC-accent), var(--mzaC-accent2));
    border-radius: inherit;
  }

  .mzaCarousel-slide[data-state='active'] .mzaCard::before {
    filter: contrast(1.06) saturate(1.12) brightness(1.02);
  }

  .mzaCarousel-slide[data-state='active'] .mzaCard {
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 0 80px -20px rgba(232, 121, 249, 0.2);
  }

  .mzaPar-1,
  .mzaPar-2,
  .mzaPar-3 {
    will-change: transform;
    transition: transform 500ms cubic-bezier(0.2, 0.7, 0, 1);
  }

  .mzaPar-1 {
    transform: translate3d(
      calc(var(--mzaParX, 0px) * 0.35),
      calc(var(--mzaParY, 0px) * 0.35),
      0
    );
  }

  .mzaPar-2 {
    transform: translate3d(
      calc(var(--mzaParX, 0px) * 0.25),
      calc(var(--mzaParY, 0px) * 0.25),
      0
    );
  }

  .mzaPar-3 {
    transform: translate3d(
      calc(var(--mzaParX, 0px) * 0.18),
      calc(var(--mzaParY, 0px) * 0.18),
      0
    );
  }

  /* Responsive adjustments */
  @media (max-width: 1000px) {
    :root {
      --mzaC-slideW: min(92vw, 620px);
    }

    .mzaCard-head {
      inset: 20px auto auto 20px;
    }

    .mzaCard-title {
      font-size: clamp(20px, 5.4vw, 30px);
    }

    .mzaCard-bottom {
      inset: auto 40px 20px 20px;
    }
  }

  @media (max-width: 768px) {
    :root {
      --mzaC-slideW: min(94vw, 560px);
    }

    .mzaCarousel {
      height: 70vh;
      min-height: 450px;
    }

    .mzaCard-bottom {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      inset: auto 20px 20px 20px;
    }

    .mzaCard-stack {
      gap: 6px;
    }

    .mzaCard-tag {
      padding: 4px 10px;
      font-size: 11px;
    }

    .mzaBtn {
      padding: 8px 12px;
      font-size: 11px;
    }

    .mzaCarousel-prev,
    .mzaCarousel-next {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 560px) {
    :root {
      --mzaC-slideW: min(96vw, 520px);
    }

    .mzaCarousel {
      height: 65vh;
      min-height: 400px;
    }

    .mzaCard-bottom {
      inset: auto 16px 16px 16px;
    }

    .mzaCard-text {
      font-size: 13px;
    }

    .mzaBtn span {
      display: none;
    }

    .mzaBtn {
      padding: 8px 10px;
    }
  }

  @media (max-height: 500px) {
    .mzaCard-text {
      display: none;
    }
  }

  @media (max-height: 400px) {
    .mzaCard-stack {
      display: none;
    }
  }
</style>
