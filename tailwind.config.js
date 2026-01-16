// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        gold: '#d4af37',
        yellowHover: '#facc15', // optional hover color
      },
    },
  },
  plugins: [],
}
