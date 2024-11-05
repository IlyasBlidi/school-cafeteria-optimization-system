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
        zrek: "#fa541c",
        limouni: "#0048FF",
        byed: "#F6F4EE",
        faragh: "#000"
      },
      fontFamily: {
        ibm: ["IBM Plex Sans Arabic", "sans-serif"],
        bixie: "BIXIE",
        tido: "TIDO",
      },
    },
  },
  plugins: [],
};
export default config;
