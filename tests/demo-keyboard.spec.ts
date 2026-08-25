import { test, expect } from "@playwright/test";

// The interactive demo is deliberately built with real <button> elements and
// no custom keydown handling, specifically so it's keyboard-operable for
// free. This test drives the whole job -> score -> tailor -> decline path
// using only keyboard activation (focus + Enter/Space), never page.click().

test("full demo flow is operable by keyboard alone", async ({ page }) => {
  await page.goto("/demo/ai-job-agent");

  const jobCard = page.locator('[data-job="backend"]');
  await jobCard.focus();
  await expect(jobCard).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page.getByText("Senior Backend Engineer")).toBeVisible();
  await expect(page.getByText(/fit score breakdown/)).toBeVisible();

  const continueButton = page.locator("#to-tailor");
  await continueButton.focus();
  await page.keyboard.press("Enter");

  const declineButton = page.locator("#decline");
  await declineButton.focus();
  await page.keyboard.press(" ");

  await expect(page.getByText(/Declined\. No application was prepared/)).toBeVisible();
});

test("the demo's status line is an aria-live region", async ({ page }) => {
  await page.goto("/demo/ai-job-agent");
  await expect(page.locator("#step-status")).toHaveAttribute(
    "aria-live",
    "polite",
  );
});
