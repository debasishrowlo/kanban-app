const defaultTheme = require('tailwindcss/defaultTheme')
const globEntries = require('webpack-glob-entries-extended')

const paths = require("./paths.js")

// NOTE: Required because webpack does not support extended globs
const content = Object.values(globEntries(paths.src + "/**/*.{html,js,jsx,ts,tsx}"))

const fontSizes = {}
const minFontSize = 12
const maxFontSize = 70
const base = 16
let i = minFontSize
while (i <= maxFontSize) {
  fontSizes[i] = `${i / base}rem`
  i += 2
}

module.exports = {
  content: content,
  darkMode: "class",
  theme: {
    fontSize: fontSizes,
    extend: {
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans'],
      },
      colors: {
        "purple": "#635FC7",
        "light-purple": "#A8A4FF",
        "red": "#EA5555",
        "light-red": "#FF9898",
        "gray": {
          100: "#F4F7FD",
          200: "#E4EBFA",
          300: "#828FA3",
          400: "#3E3F4E",
          500: "#2B2C37",
          600: "#20212C",
        },
        "black": "#000112",
        "white": "#FFFFFF",
      },
    },
  },
  plugins: [],
}