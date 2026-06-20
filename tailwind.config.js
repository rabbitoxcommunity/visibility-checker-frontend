/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nazar: {
          blue: "#1a237e",
          gold: "#f9a825",
          eye: "#00acc1",
        },
      },
    },
  },
  plugins: [],
};
