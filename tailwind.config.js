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
