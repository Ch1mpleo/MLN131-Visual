import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// When built by GitHub Actions, GITHUB_REPOSITORY is "owner/repo-name".
// Vite needs the base to be "/repo-name/" so all asset paths are correct
// under https://ch1mpleo.github.io/<repo-name>/.
// Locally it stays "/" so the dev server works without changes.
const base = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
  : "/";

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
