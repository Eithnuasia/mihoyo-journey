import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/mihoyo-journey/" : "/",
  // Optimisasi untuk assets
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Optimisasi gambar
    assetsInlineLimit: 4096, // 4kb
    chunkSizeWarningLimit: 1000,
    // Kompresi assets
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Konfigurasi untuk font
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
  // Optimisasi dev server
  server: {
    host: true,
    hmr: {
      overlay: true,
    },
  },
}));
