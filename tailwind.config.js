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
          light: colors.meteorite,
          DEFAULT: colors.meteorite,
          dark: colors.meteorite,
          contrast: colors.white,
        },
        secondary: {
          light: colors.ceriseRed,
          DEFAULT: colors.burntUmber,
          dark: colors.mahogany,
          contrast: colors.white,
        },
        success: {
          light: colors.cascade,
          DEFAULT: colors.viridian,
          dark: colors.stromboli,
          contrast: colors.white,
        },
        error: {
          light: colors.ceriseRed,
          DEFAULT: colors.burntUmber,
          dark: colors.mahogany,
          contrast: colors.white,
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
