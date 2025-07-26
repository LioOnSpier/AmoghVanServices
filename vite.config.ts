import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
// Note: You'll need to install the package first with:
// npm install -D rollup-plugin-visualizer
import viteCompression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/AmoghVanServices/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Generate bundle visualization
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    // Enable gzip compression for assets
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Enable brotli compression for even better compression
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Add PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'placeholder.svg'],
      manifest: {
        name: 'Amogh Van/Bus Services',
        short_name: 'Amogh Van',
        description: 'School transportation services',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon'
          }
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
