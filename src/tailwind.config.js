module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust if your files are in a different folder
  theme: {
    extend: {
      
   },
  },
  plugins: [require("tailwind-gradient-mask-image"), require('react-glow/tailwind')]
};
