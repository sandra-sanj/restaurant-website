/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#982A2A', // red
        'primary-foreground': '#FFFFFF',
        secondary: '#2A4B11',   // green
        'secondary-foreground': '#FFFFFF',
        navbar: '#FFFFFF',
        bglight: '#FFF7F7', // white-pink
        text: '#000000',
      },
    },
  },
  plugins: [],
};
