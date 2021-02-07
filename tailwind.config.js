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
      },
      width: {
        '9/20': '45%',
      },
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
      animation: ['hover', 'focus'],
    },
  },
  plugins: [],
};
