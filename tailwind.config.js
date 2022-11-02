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
      'almostWhite': '#CCCCCC', 
      'button': {
        500: "#7e91c3"
      },
      'itemIdentifier': {
        image: '#413ED3',
      },
      'bColor': {
        'softer': '#1e1e23',
        'soft': '#2B2B2F',
        'hard-blue': '#45435B',
      },
      'bgColor': {
        'soft': '#19191f',
        'medium-blue': '#191920',
        'hard': '#15151a',
        'basicallyBlack': '#131314',
        'bluishGrey': '#1d1d25',
        'lighterBluishGrey': '#252537',
      }
    },
    extend: {},
  },
  plugins: [],
}
