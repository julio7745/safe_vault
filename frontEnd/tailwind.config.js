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
        }
      }
  },
  plugins: [],
}