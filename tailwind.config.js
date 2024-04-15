/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a202c', // Dark mode background color
          text: '#cbd5e0', // Dark mode text color
        },
      },
    },
  },
  plugins: [],
}
