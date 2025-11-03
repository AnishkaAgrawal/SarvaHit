/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{html,ejs,js}",   // all EJS and JS inside views
    "./public/**/*.js"              // correct glob for JS in public
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
