/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6E31",
        secondary: "#434242",
        header: "#000000",
        body:'#FF6E31',
      },
    },
  },
  plugins: [],
}
