import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/main.css", "resources/js/main.jsx"],
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: "localhost",
    port: 5173,
  },
  build: {
    manifest: true,
    outDir: "public/build",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "axios"],
        },
      },
    },
  },
});
