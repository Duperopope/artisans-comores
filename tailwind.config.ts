import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#EFF8FF",
          100: "#DBEAFE",
          200: "#B6D8F7",
          300: "#7BB8EC",
          400: "#4496DE",
          500: "#2275C4",
          600: "#1A5C94",
          700: "#154D7E",
          800: "#14405E",
          900: "#0D2E4A",
          950: "#081A2C",
        },
        tropical: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#22C55E",
          600: "#2A7A4B",
          700: "#1F5E39",
          800: "#166534",
        },
        terracotta: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          400: "#FB923C",
          500: "#F97316",
          600: "#C45E2A",
          700: "#9A4420",
        },
        sand: {
          50: "#FAF7F0",
          100: "#F3EDE0",
          200: "#E8DFC9",
        },
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      spacing: {
        section: "5rem",
        "section-sm": "3rem",
      },
      maxWidth: {
        container: "1280px",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 4px 32px rgba(13, 46, 74, 0.12)",
        card: "0 2px 16px rgba(13, 46, 74, 0.08)",
        "card-hover": "0 8px 32px rgba(13, 46, 74, 0.16)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-in-out forwards",
        "slide-right": "slideRight 0.3s ease-in-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#3D3D3D",
            a: { color: "#1A5C94" },
            h1: { fontFamily: "Outfit, system-ui, sans-serif", fontWeight: "700" },
            h2: { fontFamily: "Outfit, system-ui, sans-serif", fontWeight: "600" },
            h3: { fontFamily: "Outfit, system-ui, sans-serif", fontWeight: "600" },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
