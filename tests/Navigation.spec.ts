import { test, expect } from '@playwright/test';

test('nav-001', async({ page }) =>{
    await page.goto('https://www.saucedemo.com/inventory.html');

    await test.step('scroll', async() => {
        let page_footer = page.locator('[data-test="footer"]');
        expect(page.locator('[class="bm-menu-wrap"]')).toHaveAttribute('aria-hidden','true');
        await page.locator('#react-burger-menu-btn').click();
        expect(page.locator('[class="bm-menu-wrap"]')).toHaveAttribute('aria-hidden','false');
        expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible;
    })
});

test('nav-002 Click on a product, Add to cart and Verify', async({ page }) => {

    page.goto('https://www.saucedemo.com/inventory.html');

    await test.step('Click on a product to open full view page', async() =>{
        await page.locator('[data-test=item-4-title-link]').click();
        expect(page.locator('data-test="inventory-item-price"')).toBeVisible;
    });

    await test.step('Add product to cart and validate', async() =>{
        expect (page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible;
        await page.locator('[data-test="add-to-cart"]').click();
        expect (page.locator('[data-test="shopping-cart-badge"]')).toBeVisible;
        expect (page.locator('[data-test="remove"]')).toBeVisible;
    });

    await test.step('Go back to inventory page' , async() =>{
        await page.locator('[data-test="back-to-products"]').click();
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    });
});