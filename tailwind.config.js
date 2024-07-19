/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/dist/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Work sans"]
      },
    },
  },
  plugins: [],
}