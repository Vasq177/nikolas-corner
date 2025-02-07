/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B4513",    // Saddle Brown - warm, rustic color for primary buttons
        secondary: "#DEB887",  // Burly Wood - lighter brown for secondary buttons
        accent: "#D2691E",     // Chocolate - warm accent color
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#8B4513",    // Saddle Brown
          secondary: "#DEB887",  // Burly Wood
          accent: "#D2691E",     // Chocolate
          "base-100": "#FFFFFF",
          "base-200": "#F8F9FA",
          "base-300": "#F0F0F0",
        },
      },
      "dark",
    ],
  }
} 