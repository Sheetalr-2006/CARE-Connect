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
        // Vibrant Tangerine & Warm Orange
        "primary": "#FF5A1F",
        "primary-hover": "#E64A19",
        "primary-container": "#FFE8DF",
        "primary-fixed": "#FFE8DF",
        "primary-fixed-dim": "#FFCCBA",
        "on-primary": "#ffffff",
        "on-primary-container": "#7C2200",
        "on-primary-fixed": "#7C2200",
        "on-primary-fixed-variant": "#FF5A1F",
        "inverse-primary": "#FFB59D",

        // Deep Modern Charcoal Slate (Headings & Dark Elements)
        "secondary": "#1E2229",
        "secondary-container": "#F1F5F9",
        "secondary-fixed": "#E2E8F0",
        "secondary-fixed-dim": "#CBD5E1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#0F172A",
        "on-secondary-fixed": "#0F172A",
        "on-secondary-fixed-variant": "#1E2229",

        // Warm Coral & Amber Accents
        "tertiary": "#F97316",
        "tertiary-container": "#FFF1EC",
        "tertiary-fixed": "#FFE8DF",
        "tertiary-fixed-dim": "#FFD7C9",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#7C2200",
        "on-tertiary-fixed": "#7C2200",
        "on-tertiary-fixed-variant": "#F97316",

        // Studio Clean Canvas & Card Backgrounds
        "background": "#FFFFFF",
        "on-background": "#1A1D20",

        "surface": "#FFFFFF",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#F8F9FA",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F8F9FA",
        "surface-container": "#F1F5F9",
        "surface-container-high": "#E2E8F0",
        "surface-container-highest": "#CBD5E1",
        "surface-variant": "#F1F5F9",
        "surface-tint": "#FF5A1F",
        "on-surface": "#1A1D20",
        "on-surface-variant": "#64748B",
        "inverse-surface": "#1A1D20",
        "inverse-on-surface": "#F8F9FA",
        "outline": "#CBD5E1",
        "outline-variant": "#E2E8F0",

        // System & Medical status indicators
        "error": "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error": "#ffffff",
        "on-error-container": "#410002",

        "success": "#2E7D32",
        "success-container": "#E8F5E9",
        "on-success": "#ffffff"
      },
      fontFamily: {
        serif: ["'ATC PINE'", "'ATC Pine'", "Georgia", "serif"],
        sans: ["'ATC PINE'", "'ATC Pine'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "ambient": "0 8px 30px rgba(255, 90, 31, 0.12)",
        "card": "0 2px 12px rgba(30, 34, 41, 0.04), 0 1px 3px rgba(30, 34, 41, 0.02)",
        "elevated": "0 20px 40px -15px rgba(30, 34, 41, 0.1), 0 0 1px 1px rgba(30, 34, 41, 0.05)"
      }
    },
  },
  plugins: [],
}
