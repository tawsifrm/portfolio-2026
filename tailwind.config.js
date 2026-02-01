/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#131318',
        'bg-tertiary': '#1a1a24',
        
        // Accent colors
        'accent-fuchsia': {
          DEFAULT: '#e879f9',
          light: '#f0abfc',
          dark: '#a855f7',
        },
        'accent-purple': {
          DEFAULT: '#a78bfa',
          light: '#c4b5fd',
          dark: '#7c3aed',
        },
        'accent-blue': {
          DEFAULT: '#60a5fa',
          light: '#93c5fd',
          dark: '#3b82f6',
        },
        
        // Text colors
        'text-primary': '#f8fafc',
        'text-secondary': '#cbd5e1',
        'text-muted': '#64748b',
        
        // Border/surface
        'border-subtle': '#27272a',
        'surface-glass': 'rgba(26, 26, 36, 0.7)',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.7',
        'loose': '2',
      },
      
      spacing: {
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(232, 121, 249, 0.3)',
        'glow-md': '0 0 25px -5px rgba(232, 121, 249, 0.4)',
        'glow-lg': '0 0 35px -5px rgba(232, 121, 249, 0.5)',
        'glow-purple-sm': '0 0 15px -3px rgba(167, 139, 250, 0.3)',
        'glow-purple-md': '0 0 25px -5px rgba(167, 139, 250, 0.4)',
        'glow-purple-lg': '0 0 35px -5px rgba(167, 139, 250, 0.5)',
        'glow-blue-sm': '0 0 15px -3px rgba(96, 165, 250, 0.3)',
        'glow-blue-md': '0 0 25px -5px rgba(96, 165, 250, 0.4)',
        'glow-blue-lg': '0 0 35px -5px rgba(96, 165, 250, 0.5)',
      },
      
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-out': 'fadeOut 0.3s ease-out forwards',
        'slide-in-up': 'slideInUp 0.4s ease-out forwards',
        'slide-in-down': 'slideInDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px -5px rgba(232, 121, 249, 0.4)' },
          '50%': { boxShadow: '0 0 30px -5px rgba(232, 121, 249, 0.6)' },
        },
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
