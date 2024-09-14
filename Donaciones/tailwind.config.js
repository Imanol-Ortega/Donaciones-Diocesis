/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: "#root",
  theme: {
    extend: {
      backgroundImage:{
        'fondo': "url('./src/static/fondo.jpg')",
      }
    },
  },
  plugins: [],
}

