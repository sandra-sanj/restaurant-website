import { expect, test } from "@playwright/test";


test("login works", async ({ page }) => {
  await page.goto('https://wsk-server.francecentral.cloudapp.azure.com/login');
  await page.fill("#loginuser", "userexample");
  await page.fill("#loginpassword", "password");
  await page.click("#loginBtn");
  await expect(page).toHaveURL('https://wsk-server.francecentral.cloudapp.azure.com/profile');
});

test("error in login works", async ({ page }) => {
  await page.goto('https://wsk-server.francecentral.cloudapp.azure.com/login');
  await page.fill("#loginuser", "usereamle");
  await page.fill("#loginpassword", "password");
  await page.click("#loginBtn");
  await expect(page).toHaveURL('https://wsk-server.francecentral.cloudapp.azure.com/login');
});



