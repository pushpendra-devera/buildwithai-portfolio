import { test, expect } from "@playwright/test";

const routes: Array<{ path: string; title: RegExp }> = [
  { path: "/", title: /Home/ },
  { path: "/about", title: /About/ },
  { path: "/contact", title: /Contact/ },
  { path: "/architecture", title: /Architecture/ },
  { path: "/changelog", title: /Changelog/ },
  { path: "/projects/ai-job-agent", title: /AI Job Agent/ },
  { path: "/demo/ai-job-agent", title: /Interactive Demo/ },
];

for (const route of routes) {
  test(`${route.path} loads with the expected title and no console errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(route.title);
    expect(errors).toEqual([]);
  });
}

test("primary nav (desktop or mobile) points at real routes", async ({
  page,
}) => {
  await page.goto("/");
  // Only one of the two nav landmarks is visible per viewport (Header.astro
  // hides the desktop nav below the sm breakpoint), but both exist in the
  // DOM with the same links — check by href, not by role/visibility.
  await expect(
    page.locator('a[href="/projects/ai-job-agent"]').first(),
  ).toBeAttached();
  await expect(
    page.locator('a[href="/demo/ai-job-agent"]').first(),
  ).toBeAttached();
});

test("no page links to the private ai-job-agent GitHub repository", async ({
  page,
}) => {
  for (const route of routes) {
    await page.goto(route.path);
    const html = await page.content();
    expect(html).not.toContain("github.com/pushpendra-devera/ai-job-agent");
  }
});
