import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  reporter: "list",
  use: { baseURL: process.env.STORYBOOK_URL ?? "http://localhost:6006" },
});
