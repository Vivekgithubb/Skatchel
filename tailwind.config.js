// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
        intel: ["Intel One Mono", "monospace"],
        kodemono: ["Kode Mono", "monospace"],
        marcellus: ["Marcellus", "serif"],
        oxygen: ["Oxygen", "sans-serif"],
        pixelify: ["Pixelify Sans", "cursive"],
        skranji: ["Skranji", "cursive"],
      },
      screens: {
        "3xl": "1900px", // custom breakpoint
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}", // Make sure this exists
  ],
};
