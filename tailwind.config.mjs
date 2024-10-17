/* eslint-disable no-undef */
import defaultColors from 'tailwindcss/colors';
import defaultConfig from 'tailwindcss/defaultConfig';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,html,css}', './public/*.html'],
  presets: [defaultConfig],
  darkMode: 'media', // or 'class'
  theme: {
    colors: defaultColors,
    extend: {},
  },
  plugins: [],
};
