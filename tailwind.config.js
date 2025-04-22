/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff0046',
          hover: '#cc0038'
        },
        background: '#0f1214',
        card: {
          DEFAULT: '#14161a',
          hover: '#1c1e23'
        },
        border: '#1f2227'
      }
    },
  },
  plugins: [],
};