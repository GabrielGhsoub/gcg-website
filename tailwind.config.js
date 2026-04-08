/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: 'var(--color-navy)',
        'navy-light': 'var(--color-navy-light)',
        'navy-deep': 'var(--color-navy-deep)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        cream: 'var(--color-cream)',
      },
    },
  },
  plugins: [],
}
