/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-main': "url('/images/homepage-main-background.jpeg')",
        'learn-more-1': "url('/images/homepage-learn-more-1.jpeg')",
        'learn-more-2': "url('/images/homepage-learn-more-2.jpeg')",
        'samson-family': "url('/images/samson-family.jpeg')",
        donate: "url('/images/donate-background.jpeg')"
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
        'background-100': '#fefefe',
        'background-200': '#fdfdfd',
        'background-300': '#fcfcfc',
        'background-400': '#fbfbfb',
        'background-500': '#fafafa',
        'background-600': '#e1e1e1',
        'background-700': '#c8c8c8',
        'background-800': '#afafaf',
        'background-900': '#969696',
        ahBlue: '#0059a1',
        ahGray: '#79777a'
      }
    },
    fontFamily: {
      heading: ['"Montserrat Alternatives"', 'sans-serif'],
      subheading: ['Montserrat', 'sans-serif'],
      body: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
}
