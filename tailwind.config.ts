import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "0 0% 3.9%",
        primary: {
          DEFAULT: "0 0% 9%",
          foreground: "0 0% 98%",
        },
        secondary: {
          DEFAULT: "0 0% 96.1%",
          foreground: "0 0% 9%",
        },
        destructive: {
          DEFAULT: "0 84.2% 60.2%",
          foreground: "0 0% 98%",
        },
        muted: {
          DEFAULT: "0 0% 96.1%",
          foreground: "0 0% 45.1%",
        },
        accent: {
          DEFAULT: "0 0% 96.1%",
          foreground: "0 0% 9%",
        },
        popover: {
          DEFAULT: "0 0% 100%",
          foreground: "0 0% 3.9%",
        },
        card: {
          DEFAULT: "0 0% 100%",
          foreground: "0 0% 3.9%",
        },
        // カスタムカラー
        "news-bg-alpha": "rgba(241, 241, 241, 0.60)",
        "jra-green": "#00AA43",
        "news-date-color": "rgba(51, 51, 51, 0.40)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "10px": "10px",
      },
      boxShadow: {
        "news-card": "-3px -3px 8px 0px #FFF, 5px 5px 10px 0px rgba(0, 0, 0, 0.10)",
        "earth-circle": "5px 5px 10px 0px #FFF, -3px -3px 5px 0px rgba(0, 0, 0, 0.10)",
      },
      letterSpacing: {
        "0.8": "0.8px",
        "1.88": "1.88px", // 新しいカスタムletter-spacing
      },
      lineHeight: {
        "14px": "14px",
        "30px": "30px",
        "32px": "32px",
        "20px": "20px",
        "26px": "26px", // 新しいカスタムline-height
      },
      fontSize: {
        "28px": "28px",
        "30px": "30px",
        "16px": "16px", // 新しいカスタムfont-size
        "94px": "94px", // 新しいカスタムfont-size
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
