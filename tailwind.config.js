/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches the structure of your files
  ],
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite", // Use Tailwind's default spin
        "spin-custom": "spin 1s linear infinite", // Custom spin animation
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
          /* Hide scrollbar for Webkit browsers */
          "&::-webkit-scrollbar": { display: "none" },
          /* Hide scrollbar for IE, Edge, and Firefox */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
    require("@tailwindcss/line-clamp"),
  ],
};
