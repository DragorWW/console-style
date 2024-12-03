import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/console-style/" : "/",
  root: "./site",
  build: {
    outDir: "../dist-site",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@lib": command === "build" ? "./dist" : "./src",
    },
  },
}));
