import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const previewPath = process.env.PAGES_PREVIEW_PATH?.replace(/^\/|\/$/g, "") ?? "react-preview";
const deployTarget = process.env.PAGES_DEPLOY_TARGET ?? "production";

function getBase() {
  if (!process.env.GITHUB_ACTIONS || !repositoryName) {
    return "/";
  }

  if (deployTarget === "preview") {
    return `/${repositoryName}/${previewPath}/`;
  }

  return `/${repositoryName}/`;
}

export default defineConfig({
  base: getBase(),
  plugins: [react(), tailwindcss()],
});
