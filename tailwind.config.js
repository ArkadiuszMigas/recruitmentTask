/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#8c99af", //background
        secondary: "#2b2d42", //buttons itd.
        accent: "##2e2e38", //border itd.
        text: "#2d2f3c",
      },
      fontFamily: {
        regular: ["Poppins", "System"],
        semiBold: ["SemiBold", "System"],
      },
    },
  },
  plugins: [],
}

