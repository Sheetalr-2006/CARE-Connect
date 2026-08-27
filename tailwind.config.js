/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Calming Royal Emerald & Sage Mint (Primary Healthcare Brand)
        "primary": "#0F4C3A",
        "primary-hover": "#0A3528",
        "primary-light": "#2A7F62",
        "primary-container": "#E2ECE9",
        "primary-fixed": "#D1E3DE",
        "primary-fixed-dim": "#BED4CE",
        "on-primary": "#ffffff",
        "on-primary-container": "#0F4C3A",
        "on-primary-fixed": "#0A3528",
        "on-primary-fixed-variant": "#2A7F62",
        "inverse-primary": "#86EFAC",

        // Deep Forest Green / Slate (Headings, Buttons & Bold UI Elements)
        "secondary": "#132E27",
        "secondary-hover": "#0C1F1A",
        "secondary-container": "#E8F0ED",
        "secondary-fixed": "#D5E5E0",
        "secondary-fixed-dim": "#BFD6D0",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#132E27",
        "on-secondary-fixed": "#0C1F1A",
        "on-secondary-fixed-variant": "#132E27",

        // Warm Terracotta & Amber Accents
        "tertiary": "#D97706",
        "tertiary-hover": "#B45309",
        "tertiary-container": "#FEF3C7",
        "tertiary-fixed": "#FDE68A",
        "tertiary-fixed-dim": "#FCD34D",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#78350F",
        "on-tertiary-fixed": "#78350F",
        "on-tertiary-fixed-variant": "#B45309",

        // Pale Almond & Crisp Natural Canvas Backgrounds
        "background": "#FAF8F5",
        "on-background": "#132E27",

        "surface": "#FAF8F5",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#F0EDE6",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F5F2EC",
        "surface-container": "#EAE6DC",
        "surface-container-high": "#E0DBD0",
        "surface-container-highest": "#D4CEC1",
        "surface-variant": "#E4DFD5",
        "surface-tint": "#0F4C3A",
        "on-surface": "#132E27",
        "on-surface-variant": "#46635A",
        "inverse-surface": "#132E27",
        "inverse-on-surface": "#FAF8F5",
        "outline": "#C7D4CF",
        "outline-variant": "#DCE6E2",

        // Status Indicators
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#410002",

        "success": "#0F4C3A",
        "success-container": "#E2ECE9",
        "on-success": "#ffffff"
      },
      fontFamily: {
        serif: ["Georgia", "'ATC PINE'", "'ATC Pine'", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "ambient": "0 8px 30px rgba(15, 76, 58, 0.14)",
        "card": "0 2px 12px rgba(19, 46, 39, 0.05), 0 1px 3px rgba(19, 46, 39, 0.03)",
        "elevated": "0 20px 40px -15px rgba(15, 76, 58, 0.15), 0 0 1px 1px rgba(19, 46, 39, 0.06)"
      }
    },
  },
  plugins: [],
}
