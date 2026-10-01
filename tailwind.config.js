const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Home page theme tokens. Namespaced so other pages are unaffected.
      colors: {
        // `ink` is the neo-brutalist text color; the numbered shades are the
        // bento theme's dark surfaces.
        ink: {
          DEFAULT: '#111111',
          950: '#0a0a0b',
          900: '#111113',
          850: '#161618',
          800: '#1d1d20',
        },
        // Bento accent
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        // Neo-brutalist palette
        paper: '#FFF8E7',
        sun: '#FFD23F',
        bubblegum: '#FF7AA8',
        mint: '#7FE7C4',
        lilac: '#B3B0FF',
      },
      fontFamily: {
        // The CSS variables come from next/font on each theme's wrapper.
        geist: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['var(--font-display, system-ui)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono, ui-monospace)', ...defaultTheme.fontFamily.mono],
      },
      borderWidth: {
        3: '3px',
      },
      borderRadius: {
        nb: '10px',
      },
      boxShadow: {
        'nb-sm': '3px 3px 0 0 #111111',
        nb: '6px 6px 0 0 #111111',
        'nb-lg': '10px 10px 0 0 #111111',
      },
    },
  },
  plugins: [],
}
