/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#C2FFC7',
        customBlue2: '#9EDF9C',
        customeBlue3: '#355F2E',
        customeBlue4: '#d2ffd9',
      },
      screens: {
        xs: '480px', // Define the custom breakpoint for extra small devices
      },

    },
  },
  plugins: [daisyui],
  
}