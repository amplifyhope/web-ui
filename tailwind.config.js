/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Montserrat Alternatives"', 'sans'],
        subheading: ['Montserrat', 'sans'],
        body: ['"Roboto"', 'sans']
      },
      colors: {
        'primary-100': '#66c6c2',
        'primary-200': '#4cbdb8',
        'primary-300': '#32b3ae',
        'primary-400': '#19aaa4',
        'primary-500': '#00a19a',
        'primary-600': '#00908a',
        'primary-700': '#00807b',
        'primary-800': '#00706b',
        'primary-900': '#00605c',
        'secondary-500': '#00a148',
        'secondary-600': '#009040',
        'errorColor-500': '#cd030d',
        'errorColor-600': '#b8020b',
        background: '#fafafa',
        ahBlue: '#0059a1',
        ahGray: '#79777a'
      }
    }
  },
  plugins: []
}
