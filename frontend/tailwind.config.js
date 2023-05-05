/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Open Sans", "sans-serif"],
      heading: ["Lato", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
export default config;
