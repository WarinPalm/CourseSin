/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
        "kanit-bold": ["Kanit-Bold", "sans-serif"],
        
        kanit:["Kanit-Regular", "sans-serif"],
        "kanit-extrabold": ["Kanit-ExtraBold", "sans-serif"],
        "kanit-medium": ["Kanit-Medium", "sans-serif"],
        "kanit-semibold": ["Kanit-SemiBold", "sans-serif"],
        "kanit-light": ["Kanit-Light", "sans-serif"],
      }
    },
    // colors: {
    //   "primary": {
    //     100: "#0061FF0A",
    //     200: "#0061FF1A",
    //     300: "#0061FF",
    //   },
    //   accent: {
    //     100: "#FBFBFD",
    //   },
    //   black: {
    //     DEFAULT: "#000000",
    //     100: "#8C8E98",
    //     200: "#666876",
    //     300: "#191d31",
    //   },
    //   danger: "F75555"
    // }
  },
  plugins: [],
}