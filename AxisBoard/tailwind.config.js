/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}" // Include all HTML and TypeScript files in the src folder
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        'custom': '980px', // Custom breakpoint for screens 980px and wider
      },
    }, // Close 'extend' first
  },
  plugins: [],
};
