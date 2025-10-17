const flyonui = require("flyonui");

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './node_modules/flyonui/dist/js/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: "#242424",
      },

      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
      },

    },
  },
  plugins: [
      flyonui,
      require('flyonui'),
      require('flyonui/plugin')
    ],
}
