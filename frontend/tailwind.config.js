/** @type {import('tailwindcss').Config} */
/* eslint-disable */

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
      "dark",
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=cupcake]"],
        },
      },
    ],
  },
};
export default config;
