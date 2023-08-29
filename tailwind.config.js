/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        blue: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
        },
      },
    },
    gridTemplateColumns: {
      3: "repeat(3, 320px)",
      2: "repeat(2, 320px)",
      1: "repeat(1, 300px)",
    },
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
    },
  },
  plugins: [nextui()],
};
