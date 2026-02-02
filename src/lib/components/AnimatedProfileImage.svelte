<script lang="ts">
  interface Props {
    src?: string;
    srcSm?: string;
    srcMd?: string;
    srcLg?: string;
    alt?: string;
    class?: string;
  }

  let { 
    src = '/images/new pfp.jpeg',
    srcSm = '',
    srcMd = '',
    srcLg = '',
    alt = 'Tawsif Mayaz - Computer Engineering Student',
    class: className = ''
  }: Props = $props();

  // Use responsive sources if provided, otherwise fall back to main src
  const imageSrc = $derived(srcLg || srcMd || srcSm || src);
  
  // Generate unique IDs to avoid conflicts if multiple instances exist
  const uniqueId = Math.random().toString(36).substring(2, 9);
  const clipId = `blobClip-${uniqueId}`;
  const textPathId = `textPath-${uniqueId}`;
</script>

<div class="animated-profile-container {className}">
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={alt}
    class="animated-profile-svg"
  >
    <!-- Clip path for the blob shape -->
    <clipPath id={clipId} class="blob-clip">
      <path
        d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
        transform="translate(100 100)"
      />
    </clipPath>

    <!-- Profile Image - zoomed in by making image larger and offsetting -->
    <image
      href={imageSrc}
      x="-40"
      y="-40"
      width="280"
      height="280"
      preserveAspectRatio="xMidYMid slice"
      clip-path="url(#{clipId})"
      class="profile-image"
    />

    <!-- Text path for animated border -->
    <path
      id={textPathId}
      d="M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z"
      transform="translate(100 100)"
      fill="none"
      stroke="none"
      pathLength="100"
    />

    <!-- Animated text border -->
    <text class="text-content">
      <textPath href="#{textPathId}" startOffset="0%">
        ✦ STUDENT ✦ SOFTWARE DEVELOPER ✦ GAMER ✦ FILM BUFF ✦ MELOMANIAC ✦ PRO DOOMSCROLLER
        <animate
          attributeName="startOffset"
          from="0%"
          to="100%"
          dur="15s"
          repeatCount="indefinite"
        />
      </textPath>
      <textPath href="#{textPathId}" startOffset="100%">
        ✦ STUDENT ✦ SOFTWARE DEVELOPER ✦ GAMER ✦ FILM BUFF ✦ MELOMANIAC ✦ PRO DOOMSCROLLER
        <animate
          attributeName="startOffset"
          from="-100%"
          to="0%"
          dur="15s"
          repeatCount="indefinite"
        />
      </textPath>
    </text>
  </svg>
</div>

<style>
  .animated-profile-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
  }

  .animated-profile-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* The clipPath scales on hover - this is the key effect from the original */
  .animated-profile-svg :global(.blob-clip) {
    transform-origin: center;
    transition: transform 0.4s ease-out;
  }

  .animated-profile-svg:hover :global(.blob-clip) {
    transform: scale(1.15);
  }

  .text-content {
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    fill: var(--accent-fuchsia, #e879f9);
    mix-blend-mode: normal;
    transition: fill 0.5s ease;
  }

  /* On hover, text turns white with overlay blend mode like the original */
  .animated-profile-svg:hover .text-content {
    fill: white;
    mix-blend-mode: overlay;
  }

  .profile-image {
    transition: filter 0.4s ease-out;
  }

  .animated-profile-svg:hover .profile-image {
    filter: brightness(1.05) contrast(1.02);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .text-content {
      font-size: 8px;
      letter-spacing: 1px;
    }
  }

  @media (max-width: 480px) {
    .text-content {
      font-size: 7px;
      letter-spacing: 0.8px;
    }
  }
</style>
