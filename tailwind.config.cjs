// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D73B3E', // acción, energía
          black: '#282726', // fuerza, sofisticación
          gray: '#54504C', // equilibrio
          light: '#BBBBBB', // neutro, fondo
        },
      },
      fontFamily: {
        title: ['Bebas Neue', 'sans-serif'], // H1, H2
        subtitle: ['Oswald', 'sans-serif'], // H3
        body: ['Roboto', 'sans-serif'], // texto principal
        cta: ['Montserrat', 'sans-serif'], // botones / CTA
      },
      letterSpacing: {
        tightest: '-0.05em',
        wider2: '0.125em', // ~2px
      },
    },
  },
  plugins: [],
};
