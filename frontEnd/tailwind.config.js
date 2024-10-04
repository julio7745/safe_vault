/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./**/*.ts', './**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'lightBlue': '#bdd4da',
        'mediumBlue': '#305E69',
        'darkBlue': '#1b353b',
        'darkBlueTransparent': '#1b353b8a',
        'whiteCustom': '#ffffff',
        'orangeCustom': '#FB923C',
        'blackCustom': '#000000',
        'redCustom': '#B91C1C',
        'redCustomErrDark': '#DC2626',
        'redCustomErrLight': '#EF4444',
        }
      }
  },
  plugins: [],
  darkMode: 'class',
}