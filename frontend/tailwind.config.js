/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Open Sans", "sans-serif"],
      heading: ["Lato", "sans-serif"],
    },
  },
  daisyui: {
    themes: [
      {
        base: {
          primary: "#1A2E43",
          secondary: "#6A5ACD",
          accent: "#8A8D8F",
          neutral: "#191D24",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
