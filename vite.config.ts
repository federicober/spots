import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/spots/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        404: resolve("404.html"),
      },
    },
  },
});
