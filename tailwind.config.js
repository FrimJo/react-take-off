/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindColors = require('tailwindcss/colors')

const colors = {
  /* Add custom colors here */
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
          light: tailwindColors.indigo[300],
          DEFAULT: tailwindColors.indigo[500],
          dark: tailwindColors.indigo[900],
          contrast: tailwindColors.white,
        },
        secondary: {
          light: tailwindColors.pink[300],
          DEFAULT: tailwindColors.pink[500],
          dark: tailwindColors.pink[900],
          contrast: tailwindColors.white,
        },
        success: {
          light: tailwindColors.emerald[300],
          DEFAULT: tailwindColors.emerald[500],
          dark: tailwindColors.emerald[900],
          contrast: tailwindColors.white,
        },
        error: {
          light: tailwindColors.red[300],
          DEFAULT: tailwindColors.red[500],
          dark: tailwindColors.red[900],
          contrast: tailwindColors.white,
        },
      },
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
  plugins: [require('@tailwindcss/forms')],
  future: {
    purgeLayersByDefault: true,
  },
}
