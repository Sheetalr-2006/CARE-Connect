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
        // Warm Sunset Orange & Amber (Primary Healthcare Brand)
        "primary": "#EA580C",
        "primary-hover": "#C2410C",
        "primary-light": "#FB923C",
        "primary-container": "#FFF7ED",
        "primary-fixed": "#FFEDD5",
        "primary-fixed-dim": "#FED7AA",
        "on-primary": "#ffffff",
        "on-primary-container": "#9A3412",
        "on-primary-fixed": "#7C2D12",
        "on-primary-fixed-variant": "#EA580C",
        "inverse-primary": "#FED7AA",

        // Warm Deep Charcoal & Russet (Headings, Buttons & Bold UI Elements)
        "secondary": "#1C1917",
        "secondary-hover": "#0C0A09",
        "secondary-container": "#FFF7ED",
        "secondary-fixed": "#FFEDD5",
        "secondary-fixed-dim": "#FED7AA",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#1C1917",
        "on-secondary-fixed": "#0C0A09",
        "on-secondary-fixed-variant": "#431407",

        // Golden Honey & Tangerine Accents
        "tertiary": "#F59E0B",
        "tertiary-hover": "#D97706",
        "tertiary-container": "#FEF3C7",
        "tertiary-fixed": "#FDE68A",
        "tertiary-fixed-dim": "#FCD34D",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#78350F",
        "on-tertiary-fixed": "#78350F",
        "on-tertiary-fixed-variant": "#D97706",

        // Crisp White & Warm Light Canvas Backgrounds
        "background": "#FFFFFF",
        "on-background": "#1C1917",

        "surface": "#FFFFFF",
        "surface-bright": "#FFFFFF",
        "surface-dim": "#FAFAF9",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FFFDF9",
        "surface-container": "#FBF8F4",
        "surface-container-high": "#F5F0E8",
        "surface-container-highest": "#EDE6DC",
        "surface-variant": "#F5F1EB",
        "surface-tint": "#EA580C",
        "on-surface": "#1C1917",
        "on-surface-variant": "#78716C",
        "inverse-surface": "#1C1917",
        "inverse-on-surface": "#FFFFFF",
        "outline": "#E7E5E4",
        "outline-variant": "#F5F5F4",

        // Status Indicators
        "error": "#DC2626",
        "error-container": "#FEE2E2",
        "on-error": "#ffffff",
        "on-error-container": "#7F1D1D",

        "success": "#16A34A",
        "success-container": "#DCFCE7",
        "on-success": "#ffffff"
      },
      fontFamily: {
        serif: ["Georgia", "'ATC PINE'", "'ATC Pine'", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "ambient": "0 8px 30px rgba(234, 88, 12, 0.12)",
        "card": "0 2px 12px rgba(28, 25, 23, 0.04), 0 1px 3px rgba(28, 25, 23, 0.02)",
        "elevated": "0 20px 40px -15px rgba(234, 88, 12, 0.18), 0 0 1px 1px rgba(28, 25, 23, 0.05)"
      }
    },
  },
  plugins: [],
}
