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
      STRIPE_API_KEY:
        "pk_test_51Qj1j3CYw0SAwCwil7Kb7DbQkeSPgyKOrmtxvxy6OyEr7yy0cQYwikoaw4xqNLJyKhYVG3PYx4ATyKwTSSPSwMgi00S2J1qbkI",
      STRIPE_SECRET_KEY:
        "sk_test_51Qj1j3CYw0SAwCwii4vALdLNZlwG2hME55uuwWNHQKyodHDsE0SCUN0LG7P0AFCNrnWOakx6ESZrcWrtdKAmDylU00Co9jfcjb",
    }),
    svgr({
      svgrOptions: {
        // Optional: Add SVGR options here if needed
        icon: true,
      },
    }),
  ],
});
