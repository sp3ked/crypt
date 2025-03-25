/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0d0d0d',
          dark: '#121212',
          primary: '#ff2a6d',
          secondary: '#05d9e8',
          accent: '#d1f7ff',
          purple: '#7209b7',
          yellow: '#f3e600',
          green: '#3ddc97',
        }
      },
      fontFamily: {
        'cyber': ['Orbitron', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.cyber.secondary"), 0 0 20px theme("colors.cyber.secondary")',
        'neon-pink': '0 0 5px theme("colors.cyber.primary"), 0 0 20px theme("colors.cyber.primary")',
        'neon-green': '0 0 5px theme("colors.cyber.green"), 0 0 20px theme("colors.cyber.green")',
        'neon-purple': '0 0 5px theme("colors.cyber.purple"), 0 0 20px theme("colors.cyber.purple")',
      }
    },
  },
  plugins: [],
} 