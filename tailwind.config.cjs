/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#f4f4f4",
      bg: "#131313",
      yellow: "#d8fc16",
      green: "#8fe30f",
      pink: "#fe0194",
      purple: "#552b43",
    },

    fontFamily: {
      quicksand: "'Quicksand', sans-serif;",
      roboto: "'Roboto', sans-serif;",
    },

    extend: {
      screens: {
        xxs: "374px",
        xs: "540px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1423px",
        },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
