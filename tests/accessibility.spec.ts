import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  "/",
  "/about",
  "/contact",
  "/architecture",
  "/changelog",
  "/projects/ai-job-agent",
  "/demo/ai-job-agent",
];

for (const path of pages) {
  test(`${path} has no automatically-detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

const widths = [320, 390, 768];

for (const width of widths) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/");
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  });
}

test("respects prefers-reduced-motion on the mobile nav toggle", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("#nav-toggle").click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
});
