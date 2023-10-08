/// <reference types="vitest" />

import path from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: (format) => `main.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["unist-builder", "unist-util-visit"],
    },
  },
  test: {
    globals: true,
  },
});
