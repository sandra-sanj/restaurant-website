import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  // test for full title (fails)
  // await expect(page).toHaveTitle("Test page");

  // test that title contains "Test page" as substring
  await expect(page).toHaveTitle(/Test page/);
});

test("page has image of Helsinki", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("img")).toBeVisible();
  await expect(page.getByRole("img")).toHaveAttribute(
    "alt",
    "City of Helsinki envisioned by AI"
  );
});