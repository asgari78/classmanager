import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // به‌روزرسانی خودکار
      manifest: {
        name: "Class Manager",
        short_name: "ClassMgr",
        description: "اپلیکیشن مدیریت کلاس درس",
        theme_color: "#317EFB",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*/, // کش همه URL ها
            handler: "NetworkFirst",
            options: {
              cacheName: "runtime-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 روز
              },
            },
          },
        ],
      },
    }),
  ],
})
