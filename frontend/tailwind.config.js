/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--app-font-family)'
      },
      colors: {
        'app-bg-primary': 'var(--app-bg-primary)',
        'app-bg-primary-light': 'var(--app-bg-primary-light)',
        'app-bg-secondary': 'var(--app-bg-secondary)',
        'app-label-primary': 'var(--app-label-primary)',
        'app-label-secondary': 'var(--app-label-secondary)'
      }
    }
  },
  plugins: []
}
