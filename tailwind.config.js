/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: process.env.NEXT_PUBLIC_BASE_THEME || "#d9117b",
        themeSecondary:
          process.env.NEXT_PUBLIC_THEME_SECONDARY || "#5b50a1",
        themeDarkBlue:
          process.env.NEXT_PUBLIC_THEME_DARK_BLUE || "#473c8d",
        facebook: "#3b5998",
        twitter: "#00acee",
        linkedin: "#0072b1",
        instagram: "#BD33B5",
        whatsapp: "#25d366",
        youtube: "#cd201f",
        pinterest: "#E60023",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
