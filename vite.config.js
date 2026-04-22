import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Change 'Website_Python' to your GitHub repo name
// If deploying to nandini-jampani.github.io (user page), set base: "/"
export default defineConfig({
  plugins: [react()],
  base: "/Website_Python/",
});
