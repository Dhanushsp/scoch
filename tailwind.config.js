/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#373D1C',
        'primary-light': '#4a5224',
        'primary-dark': '#2a2f15',
        'soft-white': '#fafafa',
        'text-dark': '#1a1a1a',
        'text-light': '#666666',
        'accent-gold': '#D4AF37',
        'accent-bronze': '#CD7F32',
        'accent-silver': '#C0C0C0'
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'serif': ['Ed Garamond', 'Garamond', 'serif']
      },
      animation: {
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      }
    },
  },
  plugins: [],
}
