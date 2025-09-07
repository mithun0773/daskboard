import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // ✅ only the plugin here
  daisyui: {
    themes: ["forest"], // ✅ options go here, not inside plugins
  },
};
