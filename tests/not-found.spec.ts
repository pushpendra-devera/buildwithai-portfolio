import { test, expect } from "@playwright/test";

test("an unknown route serves a real 404, not the homepage", async ({
  page,
}) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle(/Page not found/);
  await expect(
    page.getByRole("heading", { name: "This page doesn't exist." }),
  ).toBeVisible();
});

test("the 404 page is marked noindex", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");
  const robots = page.locator('meta[name="robots"]');
  await expect(robots).toHaveAttribute("content", /noindex/);
});
