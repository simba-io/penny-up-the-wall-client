import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBase = repositoryName ? `/${repositoryName}/` : "/";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? githubPagesBase : "/",
  server: {
    port: 8080,
    open: true,
  },
});
