import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["var(--font-figtree)", ...fontFamily.sans],
      headline: ["var(--font-figtree)", ...fontFamily.sans],
      body: ["var(--font-figtree)", ...fontFamily.sans],
    },
    fontSize: {
      xxs: ["0.625rem", { lineHeight: "0.75rem" }], // 10px
      xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
      sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
      base: ["1rem", { lineHeight: "1.5rem" }], // 16px
      lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
      xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
      "1.5xl": ["1.375rem", { lineHeight: "1.875rem" }], // 22px
      "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
      "2.5xl": ["1.75rem", { lineHeight: "2.25rem" }], // 28px
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
      "3.5xl": ["2rem", { lineHeight: "2.5rem" }], // 32px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
      "4.5xl": ["2.5rem", { lineHeight: "2.75rem" }], // 40px
      "5xl": ["3rem", { lineHeight: "3.625rem" }], // 48px
      "6xl": ["3.875rem", { lineHeight: "1" }], // 62px
      "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
      "8xl": ["6rem", { lineHeight: "1" }], // 96px
      "9xl": ["8rem", { lineHeight: "1" }], // 128px
    },
    extend: {
      colors: {
        brand: {
          neutral: {
            DEFAULT: "#F4F4F4",
            100: "#F4F4F4",
            200: "#ACACAC",
            300: "#CCCCCC",
            400: "#C1C1C1",
          },
          black: {
            DEFAULT: "#000000",
            100: "#333333",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
