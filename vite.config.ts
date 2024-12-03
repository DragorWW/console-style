import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/console$.ts"),
      name: "ConsoleStyle",
      fileName: "console$",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
    sourcemap: true,
    minify: "esbuild",
  },
});
