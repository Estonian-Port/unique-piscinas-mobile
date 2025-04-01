/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist-Regular', 'sans-serif'],
        "geist-semiBold": ['Geist-SemiBold', 'sans-serif'],
        "geist-bold": ['Geist-Bold', 'sans-serif'],
        "geist-extraLight": ['Geist-ExtraLight', 'sans-serif'],
        "geist-light": ['Geist-Light', 'sans-serif'],
      },
      colors: {
        primary: "#005F99", // Azul profundo
        secondary: "#00BFFF", // Celeste brillante
        accent: "#20C997", // Verde agua
        danger: "#FF6B6B", // Rojo coral
        text: "#333333", // Gris oscuro para texto
        muted: "#F5F5F5", // Gris claro para fondos secundarios
      },
    },
  },
  plugins: [],
}