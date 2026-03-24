import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        indigoDeep: '#0B1020',
        indigoCard: '#121A33',
        indigoLine: '#2B3A67',
        indigoAccent: '#6E79FF',
        indigoMint: '#67E8F9',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(110,121,255,0.18), 0 12px 40px rgba(0,0,0,0.28)'
      }
    },
  },
  plugins: [],
};

export default config;
