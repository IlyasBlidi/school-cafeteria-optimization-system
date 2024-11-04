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
        sparkler: "#fa541c",
        phoenix: "#f6f4ee",
        dobby: "#000"
      },
      fontFamily: {
        ibm: ["IBM Plex Sans Arabic", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
