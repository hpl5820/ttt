import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/docs2", component: "right" },
  ],
  npmClient: 'pnpm',
});
