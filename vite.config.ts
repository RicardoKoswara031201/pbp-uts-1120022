import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://uts-pbp-0sipdzol.hansyulian.space",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});