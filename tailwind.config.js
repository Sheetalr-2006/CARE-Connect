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
        // Moonstone Cyan & Deep Oceanic Teal (Primary Accents)
        "primary": "#336E7D",
        "primary-hover": "#24535F",
        "primary-light": "#4C9DB0",
        "primary-container": "#E0F2F6",
        "primary-fixed": "#FFEBAF",
        "primary-fixed-dim": "#FFF6DE",
        "on-primary": "#ffffff",
        "on-primary-container": "#16323B",
        "on-primary-fixed": "#1F4550",
        "on-primary-fixed-variant": "#336E7D",
        "inverse-primary": "#99C9D4",

        // Dark Ink Teal (Headings, Buttons & Bold UI Elements)
        "secondary": "#1F4550",
        "secondary-hover": "#16323B",
        "secondary-container": "#FFF6DE",
        "secondary-fixed": "#E8D49E",
        "secondary-fixed-dim": "#E5DAC0",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#1F4550",
        "on-secondary-fixed": "#16323B",
        "on-secondary-fixed-variant": "#1F4550",

        // Warm Vanilla & Honey Amber Accents
        "tertiary": "#4C9DB0",
        "tertiary-hover": "#3A8293",
        "tertiary-container": "#FFEBAF",
        "tertiary-fixed": "#FFF6DE",
        "tertiary-fixed-dim": "#EADDBF",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#1F4550",
        "on-tertiary-fixed": "#1F4550",
        "on-tertiary-fixed-variant": "#336E7D",

        // Warm Vanilla & Off-White Canvas Backgrounds
        "background": "#FFFDF7",
        "on-background": "#1F4550",

        "surface": "#FFFDF7",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#FFF6DE",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FFFDF7",
        "surface-container": "#FFF6DE",
        "surface-container-high": "#FFEBAF",
        "surface-container-highest": "#EADDBF",
        "surface-variant": "#F4EEDC",
        "surface-tint": "#336E7D",
        "on-surface": "#1F4550",
        "on-surface-variant": "#587882",
        "inverse-surface": "#1F4550",
        "inverse-on-surface": "#FFFDF7",
        "outline": "#DED6C0",
        "outline-variant": "#EFE9DA",

        // Status Indicators
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#410002",

        "success": "#2D7D62",
        "success-container": "#D6F2E7",
        "on-success": "#ffffff"
      },
      fontFamily: {
        serif: ["Georgia", "'ATC PINE'", "'ATC Pine'", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "ambient": "0 8px 30px rgba(51, 110, 125, 0.15)",
        "card": "0 2px 12px rgba(31, 69, 80, 0.05), 0 1px 3px rgba(31, 69, 80, 0.03)",
        "elevated": "0 20px 40px -15px rgba(31, 69, 80, 0.12), 0 0 1px 1px rgba(31, 69, 80, 0.06)"
      }
    },
  },
  plugins: [],
}
