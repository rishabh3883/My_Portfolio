/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      colors: {
        background: '#0a0a0a',
        surface: '#171717',
        primary: '#3b82f6',
        textMain: '#f3f4f6',
        textMuted: '#9ca3af',
      },
      boxShadow: {
        'book': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        'page': 'inset 0 0 20px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        blob: 'blob 20s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
