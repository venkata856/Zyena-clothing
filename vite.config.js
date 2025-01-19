import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import EnvironmentPlugin from "vite-plugin-environment";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin({
      // Add any environment variables you need:
    }),
    svgr({
      svgrOptions: {
        // Optional: Add SVGR options here if needed
        icon: true,
      },
    }),
  ],
});
