import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: "http://localhost:4321",
  },
  // No `webServer` block: Astro 7's `dev`/`preview` always daemonize
  // themselves, which is incompatible with Playwright managing the process
  // directly. `npm run test:e2e` (scripts/run-e2e.mjs) starts the dev
  // daemon, waits for it, runs this config, then stops the daemon.
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 } },
    },
  ],
});
