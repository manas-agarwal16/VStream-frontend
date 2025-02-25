/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches the structure of your files
  ],
  theme: {
    extend: {
      colors: {
        "gradient-start": "rgba(255, 148, 88, 1)",
        "gradient-end": "rgba(252, 229, 172, 1)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(294.57deg, rgba(255, 148, 88, 1) 0%, rgba(252, 229, 172, 1) 100%)",
      },
      animation: {
        spin: "spin 0.2s linear infinite",
        "spin-custom": "spin 0.2s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
    require("@tailwindcss/line-clamp"),
  ],
};
