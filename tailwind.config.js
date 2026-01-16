export default {
  content: [
    "./*.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts}"
  ],

  safelist: [
    // Heights
    "h-[500px]",
    "min-h-[500px]",
    "md:h-[550px]",

    // Positioning
    "absolute",
    "relative",
    "inset-0",
    "overflow-hidden",
    "z-10",

    // Image utilities
    "object-cover",
    "brightness-75",

    // Layout
    "flex",
    "items-center",
    "justify-center",

    // Text sizes
    "text-2xl",
    "text-3xl",
    "md:text-3xl",
    "text-4xl",
    "md:text-5xl"
  ],

  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
      },
    },
  },

  plugins: [],
};
