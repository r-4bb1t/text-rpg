import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22dddd",
      },
      height: {
        // @ts-expect-error this can be array
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        // @ts-expect-error this can be array
        screen: ["100vh", "100dvh"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
export default config;
