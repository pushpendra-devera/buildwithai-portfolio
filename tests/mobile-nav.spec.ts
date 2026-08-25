import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("mobile nav opens on click, closes on Escape, and returns focus to its trigger", async ({
  page,
}) => {
  await page.goto("/");

  const toggle = page.locator("#nav-toggle");
  const menu = page.locator("#mobile-nav");

  await expect(menu).toBeHidden();
  await toggle.click();
  await expect(menu).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("mobile nav closes after following a link", async ({ page }) => {
  await page.goto("/");
  await page.locator("#nav-toggle").click();
  await page.locator("#mobile-nav").getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about/);
});
