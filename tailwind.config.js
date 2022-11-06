/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "media",
  daisyui: {
    themes: ["light", "dark", "lofi"],
  },
  theme: {
    extend: {
      colors: {
        "washed-indigo": "#324d68",
        port: "#7c3f37",
        "deep-forest": "#2c4c48",
        charcoal: "#514f56",
        sienna: "#af8b48",
        canyon: "#9d7b71",
      },
      fontFamily: {
        barlow: ["Barlow Condensed", "sans-serif"],
      },
      backgroundImage: {
        "login-img":
          "url(https://images.unsplash.com/photo-1597794254624-4283a6a5a0b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("daisyui")],
};
