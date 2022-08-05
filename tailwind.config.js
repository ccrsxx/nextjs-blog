/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: '#181A1B',
        primary: '#E8E6E3',
        secondary: '#A8A095',
        link: '#3AA4FF'
      }
    }
  },
  plugins: [({ addVariant }) => addVariant('inner', '& > *')]
};
