import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,glb,gltf,woff2}"],
        runtimeCaching: [
          {
            // Cache 3D models
            urlPattern: /\.glb$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "3d-models-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache images
            urlPattern: /\.(png|jpg|jpeg|svg|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            // Cache fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
      manifest: {
        name: "Manas's Portfolio",
        short_name: "Portfolio",
        theme_color: "#0a0a1a",
        background_color: "#0a0a1a",
        display: "standalone",
        icons: [
          {
            src: "/logo.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  assetsInclude: ["**/*.glb", "**/*.gltf"],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          "react-three": ["@react-three/fiber", "@react-three/drei"],
          animations: ["framer-motion", "gsap"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});
