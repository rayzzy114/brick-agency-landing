import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        wide: '1920px',
      },
      colors: {
        // bg
        'rd-bg-default': 'var(--rd-bg-default)',
        'rd-bg-muted': 'var(--rd-bg-muted)',
        'rd-bg-subtle': 'var(--rd-bg-subtle)',
        'rd-bg-state-ghost': 'var(--rd-bg-state-ghost)',
        'rd-bg-state-secondary': 'var(--rd-bg-state-secondary)',
        'rd-bg-state-soft': 'var(--rd-bg-state-soft)',
        'rd-bg-badge': 'var(--rd-bg-badge)',
        'rd-bg-badge-orange': 'var(--rd-bg-badge-orange)',
        'rd-lime': 'var(--rd-lime)',
        'rd-lime-strong': 'var(--rd-lime-strong)',
        'rd-orange': 'var(--rd-orange)',
        'rd-orange-strong': 'var(--rd-orange-strong)',
        // text
        'rd-text-default': 'var(--rd-text-default)',
        'rd-text-primary': 'var(--rd-text-primary)',
        'rd-text-subtle': 'var(--rd-text-subtle)',
        'rd-text-muted': 'var(--rd-text-muted)',
        'rd-text-hint': 'var(--rd-text-hint)',
        'rd-text-dark': 'var(--rd-text-dark)',
        // icon
        'rd-icon-default': 'var(--rd-icon-default)',
        'rd-icon-muted': 'var(--rd-icon-muted)',
        'rd-icon-subtle': 'var(--rd-icon-subtle)',
        'rd-icon-black': 'var(--rd-icon-black)',
        'rd-icon-info': 'var(--rd-icon-info)',
        // border
        'rd-border-default': 'var(--rd-border-default)',
        'rd-border-darker': 'var(--rd-border-darker)',
        'rd-border-accent': 'var(--rd-border-accent)',
      },
      fontSize: {
        'rd-xs': ['12px', { lineHeight: '16px' }],
        'rd-sm': ['14px', { lineHeight: '20px' }],
        'rd-md': ['16px', { lineHeight: '24px' }],
        'rd-lg': ['18px', { lineHeight: '28px' }],
        'rd-2xl': ['24px', { lineHeight: '32px' }],
        'rd-4xl': ['36px', { lineHeight: '40px', letterSpacing: '-2px' }],
      },
      boxShadow: {
        'rd-component': 'var(--rd-shadow-component)',
        'rd-button-primary': 'var(--rd-shadow-button-primary)',
        'rd-card': 'var(--rd-shadow-card)',
      },
      fontFamily: {
        sans: ['var(--rd-font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
