/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist-Regular', 'sans-serif'],
        'geist-semi-bold': ['Geist-semiBold', 'sans-serif'],
        'geist-bold': ['Geist-Bold', 'sans-serif'],
        'geist-extraLight': ['Geist-ExtraLight', 'sans-serif'],
        'geist-light': ['Geist-Light', 'sans-serif'],
      },
      colors: {
        text: '#333333', // Gris oscuro para texto
        'gold-unique': '#a59064',
        'purple-unique': '#4e4965',
        'navy-unique': '#222247',
        'grayish-unique': '#ceccd9',
        'red-alert': '#ff4d4f',
      },
    },
  },
  plugins: [],
};
