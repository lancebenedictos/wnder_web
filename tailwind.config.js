/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // aspectRatio: {
      //   "1/3": "1/ 3",
      // },
      colors: {
        "off-white": "#FAF9F6",
      },
      gridTemplateColumns: {
        md: "8% 1fr",
        lg: "17% 1fr",
      },

      gridTemplateRows: {
        sm: "50px 1fr 56px",
      },
    },
  },
  plugins: [],
};
