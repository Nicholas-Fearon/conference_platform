/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        sand: "#f5f1e8",
        clay: "#e7d6b5",
        ember: "#d97706",
        pine: "#1d4d4f",
        mist: "#ecf2f1"
      },
      boxShadow: {
        card: "0 18px 60px rgba(15, 23, 42, 0.08)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.08) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
