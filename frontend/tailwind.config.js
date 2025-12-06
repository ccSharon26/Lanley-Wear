/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00c4b4",   // Brighter teal/turquoise
        accent: "#ff6b81",    // Vibrant coral/pink for cute pop
        dark: "#1a1a1a",      // Deep black
        light: "#ffffff",     // White
        grayish: "#e2e8f0",   // Soft gray
      },
    },
  },
  plugins: [],
};
