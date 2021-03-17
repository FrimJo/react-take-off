/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindColors = require('tailwindcss/colors')

const colors = {
  alto: '#DADADA',
  burntUmber: '#932432',
  cascade: '#87ab9b',
  ceriseRed: '#DE354C',
  concrete: '#F3F3F3',
  contessa: '#CA7B7B',
  limedSpruce: '#38424B',
  mahogany: '#5C0707',
  mercury: '#E3E3E3',
  meteorite: '#3C1874',
  mineShaft: '#1F1F1F',
  oldRose: '#BA8077',
  pickledBluewood: '#283747',
  purpleMountainsMajesty: '#8877BA',
  scorpion: '#606060',
  stromboli: '#33654F',
  viridian: '#4D9273',
  whisper: '#F5F4F9',
  white: '#FFFFFF',
}

module.exports = {
  purge: {
    enabled: true,
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          light: tailwindColors.indigo[500],
          DEFAULT: tailwindColors.indigo[600],
          dark: tailwindColors.indigo[700],
          contrast: tailwindColors.white,
        },
        secondary: {
          light: tailwindColors.pink[500],
          DEFAULT: tailwindColors.pink[600],
          dark: tailwindColors.pink[700],
          contrast: tailwindColors.white,
        },
        success: {
          light: tailwindColors.emerald[500],
          DEFAULT: tailwindColors.emerald[600],
          dark: tailwindColors.emerald[700],
          contrast: tailwindColors.white,
        },
        error: {
          light: tailwindColors.red[500],
          DEFAULT: tailwindColors.red[600],
          dark: tailwindColors.red[700],
          contrast: tailwindColors.white,
        },
      },
      textColor: (theme) => ({}),
      backgroundColor: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Open sans', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
}
