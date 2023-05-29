/* eslint-disable */
// @ts-nocheck

import { defineConfig, configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://www.robinwieruch.de/vite-eslint/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/testing/setup.ts",
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        "src/testing/*",
        "src/worker/*",
      ],
    },
  },
  base: "",
});
