/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-black",
    "text-white",
    "bg-gold",
    "text-gold",
    "hover:bg-gold",
    "hover:text-black",
    "hidden",
    "block",
    "flex",
    "grid",
  ],
  plugins: [],
};
