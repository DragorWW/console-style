import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/console$.ts"),
      name: "ConsoleStyle",
      formats: ["es", "cjs"],
      fileName: (format) => `console$.${format === "es" ? "js" : "cjs.js"}`,
    },
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
    sourcemap: true,
  },
});
