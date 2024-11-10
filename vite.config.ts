import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     "pdfjs-dist/build/pdf.worker.entry": path.resolve(
  //       __dirname,
  //       "node_modules/pdfjs-dist/build/pdf.worker.entry.js"
  //     ),
  //   },
  // },

  optimizeDeps: {
    include: ["pdfjs-dist/build/pdf.worker.min.js"],
  },
});
