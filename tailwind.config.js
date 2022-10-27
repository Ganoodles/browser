/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/pages/files/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      Inter: ['Inter', 'sans-serif']
    }, 
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'button': {
        500: "#7e91c3"
      },
      'themeColor' : {
        300: "#3C4251",
        400: "#656871",
        450: "#3b3e46",
        500: "#26272e",
        600: "#212125",
        700: "#26262B",
        800: "#1e1e22",
        900: '#18181B',
        1000: '#101012'
      },
      'textColor' : {
        500: '#979797',
        600: '#7c8abd',
      },
      'itemIdentifier': {
        image: '#413ED3',
      }
    },
    extend: {},
  },
  plugins: [],
}
