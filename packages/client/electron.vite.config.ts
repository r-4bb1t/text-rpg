import { defineConfig, externalizeDepsPlugin, loadEnv } from "electron-vite";
import { resolve } from "path";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode);
  console.log(env);
  return {
    main: {
      plugins: [externalizeDepsPlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
    },
    renderer: {
      resolve: {
        alias: {
          "@renderer": resolve("src/renderer/src"),
          "@shared": resolve("../shared"),
        },
      },
      plugins: [react()],
    },
  };
});
