// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          1: "#00ffff",
          2: "#00efff",
          3: "#00deff",
          4: "#00cbff",
          5: "#00b8ff",
          6: "#00a3ff",
          7: "#008cff",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Sans-serif"],
      },
      minWidth: { "200px": "200px" },
      maxWidth: {
        "10vw": "10vw",
        "20vw": "20vw",
        "30vw": "30vw",
        "40vw": "40vw",
        "50vw": "50vw",
        "60vw": "60vw",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw",
        "100vw": "100vw",
      },
      maxHeight: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        fit: "fit-content",
      },
      height: {
        "1px": "1px",
        "2px": "2px",
        "3px": "3px",
        fit: "fit-content",
      },
      width: {
        "50vw": "50vw",
      },
      margin: {
        "1vw": "1vw",
        "2vw": "2vw",
        "3vw": "3vw",
        "4vw": "4vw",
        "5vw": "5vw",
        "6vw": "6vw",
        "7vw": "7vw",
        "8vw": "8vw",
        "9vw": "9vw",
      },
      padding: {
        "1vw": "1vw",
        "2vw": "2vw",
        "3vw": "3vw",
        "4vw": "4vw",
        "5vw": "5vw",
        "6vw": "6vw",
        "7vw": "7vw",
        "8vw": "8vw",
        "9vw": "9vw",
      },
      keyframes: {
        beat: {
          "0%, 100%": { transform: "scale(0.85)" },
          "50%": { transform: "scale(1)" },
        },
      },
      animation: {
        beat: "beat 1s ease-in-out infinite",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["hover", "focus"],
      width: ["group-focus", "focus", "focus-within"],
      scale: ["group-focus"],
      rotate: ["group-focus"],
      translate: ["group-focus"],
      backgroundColor: ["active", "group-focus"],
      brightness: ["hover"],
      maxHeight: ["group-focus"],
      maxWidth: ["focus", "focus-within"],
      pointerEvents: ["group-focus"],
      cursor: ["group-focus", "focus"],
    },
  },
  plugins: [],
};
