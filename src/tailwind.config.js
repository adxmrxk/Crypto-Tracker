module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust if your files are in a different folder
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },

      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite"
      },

      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)"},
          to: { transform: "translateX(-100%)"},
        }
      }
    },
  },
  plugins: [require("tailwind-gradient-mask-image"), require('react-glow/tailwind')]
};
