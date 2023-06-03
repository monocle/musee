/** @type {import('tailwindcss').Config} */
/* eslint-disable */

const dark = require("daisyui/src/colors/themes")["[data-theme=dark]"];

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    fontFamily: {
      primary: ["Open Sans", "sans-serif"],
      heading: ["Lato", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "base-100": "hsl(0 0% 90%)",
          neutral: "hsl(0 0% 60%)",
          primary: "hsl(182, 91%, 34%)",
        },
        dark: {
          ...dark,
          primary: "hsl(182, 91%, 34%)",
        },
      },
    ],
  },
};
export default config;
