var baseColors = {
  alto: { DEFAULT: '#DADADA' },
  cascade: { DEFAULT: '#87ab9b' },
  concrete: { DEFAULT: '#F3F3F3' },
  contessa: { DEFAULT: '#CA7B7B' },
  limedSpruce: { DEFAULT: '#38424B' },
  mercury: { DEFAULT: '#E3E3E3' },
  meteorite: { DEFAULT: '#3C1874' },
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
      colors: { ...baseColors },
      textColor: (theme) => ({
        primary: theme('colors').limedSpruce.DEFAULT,
      }),
      backgroundColor: (theme) => ({
        primary: theme('colors').concrete.DEFAULT,
        secondary: theme('colors').meteorite.DEFAULT,
      }),
    },
    fontFamily: {
      sans: ['Arial', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
}
