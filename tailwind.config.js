/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./public/**/*.js",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gold: "#d4af37",
        yellowHover: "#facc15",
      },
    },
  },
  safelist: [
    "bg-gold",
    "text-gold",
    "border-gold",
    "hover:bg-gold",
    "hover:text-black",
  ],
  plugins: [],
};
