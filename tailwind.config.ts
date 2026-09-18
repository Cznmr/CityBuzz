import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // CityBuzz Design System
        brand: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Primary orange
          600: "#ea6c0a", // Primary hover
          700: "#c2570a",
          800: "#9a3412",
          900: "#7c2d12",
        },
        accent: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Accent blue
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f9fafb",
          tertiary: "#f3f4f6",
        },
        ink: {
          DEFAULT: "#111827",  // Primary text
          secondary: "#374151",
          muted: "#6b7280",
          subtle: "#9ca3af",
          disabled: "#d1d5db",
        },
        border: {
          DEFAULT: "#e5e7eb",
          strong: "#d1d5db",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25", fontWeight: "600" }],
        "heading-xl":  ["1.5rem",  { lineHeight: "1.3", fontWeight: "600" }],
        "heading-lg":  ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-md":  ["1.125rem",{ lineHeight: "1.5", fontWeight: "600" }],
        "body-lg":     ["1.125rem",{ lineHeight: "1.75" }],
        "body-md":     ["1rem",    { lineHeight: "1.75" }],
        "body-sm":     ["0.875rem",{ lineHeight: "1.6" }],
        "label-lg":    ["0.875rem",{ lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.02em" }],
        "label-md":    ["0.75rem", { lineHeight: "1.4", fontWeight: "600", letterSpacing: "0.05em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card:   "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover": "0 8px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -2px rgb(0 0 0 / 0.07)",
        "card-lg": "0 4px 16px -2px rgb(0 0 0 / 0.10), 0 2px 6px -1px rgb(0 0 0 / 0.06)",
        focus: "0 0 0 3px rgba(249, 115, 22, 0.35)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out forwards",
        "fade-in": "fadeIn 0.3s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
