import { expect, test } from "@playwright/test";

test('goes to desserts', async ({ page }) => {
    await page.goto('https://wsk-server.francecentral.cloudapp.azure.com/menu');
    await page.click('#desserts');
    await expect(page).toHaveURL('https://wsk-server.francecentral.cloudapp.azure.com/desserts');
});

test('display quantity', async ({ page }) => {
    await page.click('#button-for-opening-modal');
    await page.click('#quantity-plus-btn');
    const value = await page.locator('#quantityOfItems').innerText();
    await expect(parseInt(value)).toBe(2);
})


test('add to cart', async ({ page }) => {
    await page.click('#addToCartBtn');
    await page.goto('https://wsk-server.francecentral.cloudapp.azure.com/cart');
    await page.click('#goToCart');
    await page.click('#apple-pay');
    await expect(page.locator('payment-modal')).toBeVisible();
})




