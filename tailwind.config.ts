import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta estilo Arcane
        'arcane': {
          'copper': '#B87333',
          'rust': '#A0522D',
          'dark-copper': '#8B4513',
          'neon-green': '#39FF14',
          'neon-blue': '#00D9FF',
          'dark-purple': '#2D1B3D',
          'deep-purple': '#1A0F25',
          'oxidized': '#CD853F',
          'ash': '#4A4A4A',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'display': ['var(--font-geist-sans)'],
        'mono': ['var(--font-geist-mono)'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          'from': {
            textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
          },
          'to': {
            textShadow: '0 0 20px #39FF14, 0 0 30px #39FF14, 0 0 40px #39FF14',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
