/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        BLUE : "#9BAFFF",
        BLUE2: "#007AFF",
        primary : "#de2c4d",
        secondary : "#fb923c",
      },

      fontFamily:{
        roboto: ["Roboto", "sans-serif"]
      },

      container:{
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "5rem",
          "2xl":"6rem",
        }
      }

    },
  },
  plugins: [],
}

