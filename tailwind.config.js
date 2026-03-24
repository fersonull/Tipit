/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.{jsx,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        instrument: ['InstrumentSans-Regular'],
        'instrument-bold': ['InstrumentSans-Bold'],
      },
    },
  },
  plugins: [],
};
