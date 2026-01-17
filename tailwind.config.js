/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html"],
  
safelist: [
    // add all other dynamic/arbitrary classes you use
    "min-h-screen","flex","items-center","justify-center",
    "grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-[1fr_420px]",
    "gap-2","gap-3","gap-4","gap-6","gap-10",
    "overflow-x-auto","overflow-y-auto",
    "h-[500px]","md:h-[550px]",
    "px-2","px-3","px-4","px-5","px-6","px-8",
    "py-2","py-3","py-4","py-5","mb-2","mb-3","mb-4","mb-6",
    "rounded-lg","rounded-xl","rounded-2xl",
    "text-2xl","text-3xl","text-4xl","text-5xl",
    "text-xs","text-sm","text-base","font-bold","font-semibold","font-extrabold",
    "text-black","text-white","text-gray-200","text-gray-300","text-zinc-200","text-yellow-400","text-red-500",
    "bg-black/30","bg-black/40","bg-zinc-900","bg-zinc-900/20",
    "bg-yellow-200","bg-yellow-400","bg-gradient-to-b","bg-gradient-to-br","bg-gradient-to-r",
    "from-black","via-slate-950","to-slate-900","to-black/30","to-black/60",
    "border","border-white/5","border-white/10","border-yellow-400/20","border-yellow-500","border-zinc-700",
    "hover:bg-yellow-400","hover:text-black","hover:scale-105","transition","transition-all",
    "brightness-75","drop-shadow"
],
theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        gold: "#d4af37",
      },
    },
  },
}
