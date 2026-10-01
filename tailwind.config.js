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
      // Neo-brutalist home page palette
      colors: {
        ink: '#111111',
        paper: '#FFF8E7',
        sun: '#FFD23F',
        bubblegum: '#FF7AA8',
        mint: '#7FE7C4',
        lilac: '#B3B0FF',
      },
      fontFamily: {
        // The CSS variables come from next/font on the home page wrapper.
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
