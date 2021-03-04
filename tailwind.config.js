var baseColors = {
  alto: { DEFAULT: '#DADADA' },
  cascade: { DEFAULT: '#87ab9b' },
  concrete: { DEFAULT: '#F3F3F3' },
  contessa: { DEFAULT: '#CA7B7B' },
  limedSpruce: { DEFAULT: '#38424B' },
  mercury: { DEFAULT: '#E3E3E3' },
  meteorite: { DEFAULT: '#3C1874' },
  mineShaft: { DEFAULT: '#1F1F1F' },
  oldRose: { DEFAULT: '#BA8077' },
  purpleMountainsMajesty: { DEFAULT: '#8877BA' },
  scorpion: { DEFAULT: '#606060' },
  whisper: { DEFAULT: '#F5F4F9' },
  white: { DEFAULT: '#FFFFFF' },
}

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ...baseColors, success: baseColors.cascade },
      textColor: (theme) => ({
        primary: theme('colors').mineShaft.DEFAULT,
      }),
      backgroundColor: (theme) => ({
        primary: theme('colors').concrete.DEFAULT,
        secondary: theme('colors').meteorite.DEFAULT,
      }),
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Open sans', 'sans-serif'],
      },
    },
  },
}
