const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
],

  safelist: [
    "bg-primary",
    "text-primary-foreground",
    "bg-background",
    "text-foreground",
    "bg-muted",
    "text-muted-foreground",
    "bg-card",
    "text-card-foreground",
    "border-border",
    "hover:bg-primary/90",
    "text-lg",
    "rounded-md",
    "px-8",
    "h-11"
],


  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          '--background': '180 30% 96%',
          '--foreground': '180 100% 8%',
          '--border': '180 20% 85%',
          '--input': '180 20% 85%',
          '--ring': '174 89% 32%',
          '--radius': '0.5rem',
          '--primary': '174 89% 32%',
          '--primary-foreground': '0 0% 100%',
          '--secondary': '174 44% 85%',
          '--secondary-foreground': '180 100% 8%',
          '--muted': '180 30% 92%',
          '--muted-foreground': '180 20% 45%',
          '--accent': '174 89% 40%',
          '--accent-foreground': '0 0% 100%',
          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '210 40% 98%',
          '--card': '0 0% 100%',
          '--card-foreground': '180 100% 8%',
        },
      });
    }),
  ],
};
