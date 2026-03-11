/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Content script must be a single file (no ES module imports) for Chrome.
 * This config builds only the content entry as IIFE so it has no chunk imports.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/content/index.tsx"),
      output: {
        format: "iife",
        entryFileNames: "content.js",
        assetFileNames: "content.[ext]",
        inlineDynamicImports: true
      }
    }
  }
});
