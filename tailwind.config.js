module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'work': ['Work Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'button': '#445C77',
        'hoverBlue': '#7796b8',
        'warning': '#b52f2f',
        'warningHover': '#8c1919',
        'navbar': '#7f8fb5',
        'alertRed': '#d26161',
      },
      width: {
        '9/20': '48.5%',
      },
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      animation: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
};
