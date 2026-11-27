import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En GitHub Pages, un repo de proyecto se sirve bajo /nombre-del-repo/.
// El workflow de despliegue define VITE_BASE automáticamente.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
