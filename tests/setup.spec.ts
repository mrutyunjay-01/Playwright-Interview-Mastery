import { expect, test } from '@playwright/test';
import { ENV } from '../config/env';

test('Create session and store authentication state', async({ page }) =>{

    await page.goto('https://www.saucedemo.com/');

    await test.step('Login successfully', async() =>{
        await page.locator('[data-test="username"]').fill(ENV.NORMAL_USER!);
        await page.locator('[data-test="password"]').fill(ENV.PASSWORD!);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });

    await test.step('store session state', async() =>{
        await page.context().storageState({ path: './.auth/session.json' });
    });
});