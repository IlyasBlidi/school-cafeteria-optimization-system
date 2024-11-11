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
        limoni: "#fa541c",
        zrek: "#0048FF",
        byed: "#F6F4EE",
        faragh: "#000",
      },
      fontFamily: {
        "general-sans": ["General Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
