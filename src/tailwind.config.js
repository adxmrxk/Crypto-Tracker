module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-blue-gradient': 'linear-gradient(to bottom right, #a5b9d6, #879bbb, #5f6f8b)'
      }
      
   },
  },
  plugins: [require("tailwind-gradient-mask-image"), require('react-glow/tailwind')]
};
