/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#4a5dff',
          600: '#3947db',
        },
      },
    },
  },
  plugins: [],
};
