/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050608",
        grayLight: "#161821",
        gold: "#e6b800",
      },
    },
  },
  plugins: [],
};
