import { test, expect } from '@playwright/test';
import { ENV } from '../../config/env';

test('login-001 Validate Successful Login to SauceDemo Site', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');

    await test.step('Enter Username and Password', async () =>{        
        await page.locator('[data-test="username"]').fill(ENV.NORMAL_USER!);
        await page.locator('[data-test="password"]').fill(ENV.PASSWORD!);
        await page.locator('[data-test="login-button"]').click();
    });

    await test.step('Verify successful login', async () =>{
        await expect(page.getByText('products')).toBeVisible();
    });
});

test('login-002 Validate Inventory Page with Session Storage', async ({page}) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    await test.step('Validate inventory page', async () =>{
        await expect(page.getByText('Products')).toBeVisible();
    });
});

test('login-003 Validate locked user not able to login', async({page}) =>{
    await page.goto('https://www.saucedemo.com/inventory.html');

    await test.step('Validate locked user error', async() => {
        await page.locator('[data-test="username"]').fill(ENV.LOCKED_USER!);
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});