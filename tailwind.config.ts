import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E11D2A', // rojo Chicken Palace
          dark: '#B0141F',
          light: '#FF4D58',
        },
        accent: {
          DEFAULT: '#F5A623', // dorado/ámbar
        },
        // Superficies oscuras coherentes con el ERP / Command Center
        surface: {
          DEFAULT: '#0a0a0b', // zinc-950
          900: '#18181b', // zinc-900
          800: '#27272a', // zinc-800
          glass: 'rgba(255,255,255,0.06)',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(225,29,42,0.5)',
        'glow-amber': '0 0 40px -10px rgba(245,166,35,0.45)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E11D2A 0%, #F5A623 100%)',
        'surface-gradient':
          'linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #0a0a0b 100%)',
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
