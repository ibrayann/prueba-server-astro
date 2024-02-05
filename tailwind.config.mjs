/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#8DAFBC",
        primaryDark: "#0F172A",
        secondary: "#16302B",
        bgLight: "rgba(255, 255, 255, 0.1)",
        bgCard: "#DDDFE0",
        bgCardHover: "#CECECE",
        bgLayout: "#E8E8E8",
      },
    },
  },
};
