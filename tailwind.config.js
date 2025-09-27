
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
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
    plugins: [],
  }
}
