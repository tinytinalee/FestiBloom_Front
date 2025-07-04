import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 스프링 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
