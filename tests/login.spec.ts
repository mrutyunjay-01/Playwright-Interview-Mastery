import { test, expect} from '@playwright/test';


test('Validate Successful Login to SauceDemo Site', async({page}) => {

    await page.goto('https://www.saucedemo.com/');

    await test.step('Enter Username and Password', async () =>{        
        await page.locator('[data-test="username"]').fill(process.env.NORMAL_USER!);
        await page.locator('[data-test="password"]').fill(process.env.PASSWORD!);
        await page.locator('[data-test="login-button"]').click();
    })

    await test.step('Verify successful login', async () =>{
        await expect(page.getByText('products')).toBeVisible();
    })
});
