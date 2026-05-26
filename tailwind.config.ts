import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme variables for use with @apply
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        surface: 'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        'surface-active': 'var(--surface-active)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
      },
      // // Ensure CSS variables work with all color utilities
      // backgroundColor: {
      //   primary: 'var(--primary)',
      //   secondary: 'var(--secondary)',
      //   accent: 'var(--accent)',
      //   surface: 'var(--surface)',
      //   'surface-hover': 'var(--surface-hover)',
      //   'surface-active': 'var(--surface-active)',
      // },
      // textColor: {
      //   primary: 'var(--text-primary)',
      //   secondary: 'var(--text-secondary)',
      //   muted: 'var(--text-muted)',
      //   foreground: 'var(--foreground)',
      // },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config; 