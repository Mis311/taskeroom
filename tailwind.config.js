module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'base': '#393857',
        'secondary': '#30304C',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
