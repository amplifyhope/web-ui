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
        body: ['"Nunito Sans"', 'sans']
      },
      colors: {
        primary: '#00a19a',
        secondary: '#00a148',
        errorColor: '#cd030d',
        background: '#fafafa'
      }
    }
  },
  plugins: []
};
