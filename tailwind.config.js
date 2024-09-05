/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bgimage: "url('images/bgimage.jpg')",
      },
      colors:{
        bgcolor: "rgb(49,49,49,1)",
      },
      spacing:{
        custom: "96%",
      }
    },
  },
  plugins: [],
};
