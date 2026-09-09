/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dev: {
          void: '#05070B',
          base: '#0A0D14',
          surface: '#111622',
          elevated: '#171F30',
          overlay: 'rgba(10, 13, 20, 0.85)',
          cyan: '#00F0FF',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
          violet: '#8B5CF6',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        os: '10px',
      },
      boxShadow: {
        'os-window': '0 20px 50px -10px rgba(0, 0, 0, 0.65), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'os-active': '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 240, 255, 0.25)',
        'os-glow': '0 0 25px rgba(0, 240, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
