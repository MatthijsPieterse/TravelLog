import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  base: "/TravelLog/",
  resolve: {
    alias: {
      "#assets": path.resolve(__dirname, "./src/assets"),
      "#app": path.resolve(__dirname, "./src/app"),
      "#features": path.resolve(__dirname, "./src/features"),
      "#shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const normalizedId = id.replaceAll("\\", "/");

          // Leaflet and mapping libraries
          if (
            normalizedId.includes("node_modules/leaflet") ||
            normalizedId.includes("node_modules/react-leaflet")
          ) {
            return "leaflet";
          }
          // Geospatial analysis
          if (normalizedId.includes("node_modules/@turf")) {
            return "turf";
          }
          // React ecosystem
          if (
            normalizedId.includes("node_modules/react/") ||
            normalizedId.includes("node_modules/react-dom") ||
            normalizedId.includes("node_modules/react-router-dom")
          ) {
            return "react-vendor";
          }
          // Data fetching
          if (normalizedId.includes("node_modules/@tanstack/react-query")) {
            return "react-query";
          }
          // Shared travel-log UI/utilities that appear on multiple pages
          if (
            normalizedId.includes("/src/features/travel-log/components/shared/") ||
            normalizedId.includes("/src/features/travel-log/utils/") ||
            normalizedId.includes("/src/features/travel-log/types/")
          ) {
            return "travel-log-shared";
          }
        },
      },
    },
  },
});
