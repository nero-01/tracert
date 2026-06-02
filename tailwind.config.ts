import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#edfcf9",
          100: "#d2f7f1",
          200: "#a8efe4",
          300: "#6fe2d3",
          400: "#38ccbe",
          500: "#1ab0a4",
          600: "#128d84",
          700: "#117170",
          800: "#125a5a",
          900: "#124a4b",
        },
        surface: {
          light: "#f8fafc",
          DEFAULT: "#ffffff",
          dark: "#0f172a",
          darker: "#080f1e",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "14px",
        pill: "999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-hover)",
        "card-dark": "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        "card-hover-dark":
          "0 4px 12px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.4)",
        "glow-teal": "0 0 0 3px rgba(26,176,164,0.2)",
        "glow-teal-strong": "0 0 20px rgba(26,176,164,0.25)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "ring-fill": {
          from: { strokeDashoffset: "var(--ring-circumference)" },
          to: { strokeDashoffset: "var(--ring-offset)" },
        },
        flash: {
          "0%": { backgroundColor: "rgba(26,176,164,0.12)" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "ring-fill": "ring-fill 800ms ease-out forwards",
        flash: "flash 400ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
