/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors (static)
        navy: 'var(--color-navy)',
        'navy-light': 'var(--color-navy-light)',
        'navy-deep': 'var(--color-navy-deep)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        cream: 'var(--color-cream)',
        // Semantic colors (dynamic)
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
}
