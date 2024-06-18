import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "background-second": "var(--backgroundSecond)",
        "background-hover": "var(--backgroundHover)",
        "foreground": "var(--foreground)",
        "foreground-second": "var(--foregroundSecond)",
        "accent": "var(--accent)",
        "border": "var(--border)",
        "button": "var(--button)",
        "button-hover": "var(--buttonHover)",
        "icon": "var(--icon)",
        "shadow": "var(--shadow)",
      }
    },
  },
  plugins: [],
};
export default config;
