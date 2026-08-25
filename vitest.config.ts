import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests live alongside their source in src/. Playwright owns
    // everything under tests/ (*.spec.ts) — keep the two runners from
    // ever picking up each other's files.
    include: ["src/**/*.test.ts"],
  },
});
