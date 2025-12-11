import { expect, test } from "@playwright/test";

test('goes to desserts', async ({ page }) => {
    await page.goto('https://wsk-server.francecentral.cloudapp.azure.com/menu');
    await page.click('#desserts');
    const response = page.waitForResponse(resp =>
        resp.url().includes('/menu') && resp.status() === 200
    );
    await response;
    const Churros = page.locator('h2', {hasText: 'Churrot'});
    await expect(Churros).toBeVisible();
    await expect(page).toHaveURL('https://wsk-server.francecentral.cloudapp.azure.com/menu/desserts');
    const buttons = page.locator('button');
    await buttons.nth(2).click(); 
    await buttons.nth(3).click();
    const Flan = page.locator('h2', {hasText: 'Flan'});
    await expect(Flan).toBeVisible();
});





