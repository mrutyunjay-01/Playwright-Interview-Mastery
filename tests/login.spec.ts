import { test, expect } from '@playwright/test';


test('login-001 Validate Successful Login to SauceDemo Site And Store Session', async({page}) => {

    await page.goto('https://www.saucedemo.com/');

    await test.step('Enter Username and Password', async () =>{        
        await page.locator('[data-test="username"]').fill(process.env.NORMAL_USER!);
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.locator('[data-test="login-button"]').click();
    });

    await test.step('Verify successful login', async () =>{
        await expect(page.getByText('products')).toBeVisible();
    });
    await test.step('Store authentication state', async () => {
        await page.context().storageState({path: './.auth/session.json'});

    });
});

test('login-002 Validate Inventory Page with Session Storage', async ({page}) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    await test.step('Validate inventory page', async () =>{
        await expect(page.getByText('Products')).toBeVisible();
    });
});