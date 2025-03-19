/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        russian_violet: "#100D39",
        baby_powder: "#F4F5EE",
        true_blue: "#3164C4",
        timber_wolf: "#E6E0D8",
        fuscous_gray : "#474743",
        gray_nickel : "#BFC0BB",
        primary: "#FFFFFF",
        secondary: "#000000",
      },
    },
  },
  plugins: [],
}