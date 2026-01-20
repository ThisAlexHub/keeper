import { test, expect } from '../fixtures/test-base';
import { TEST_CREDENTIALS } from '../utils/helpers';

/**
 * Smoke: Logout
 * Why critical: Confirms session termination and redirect to login page.
 */

test.describe('Smoke: Logout', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('logs out and returns to login page', async ({ loginPage, dashboardPage, page }) => {
        await test.step('Login', async () => {
            await loginPage.login(TEST_CREDENTIALS.ADMIN_USERNAME, TEST_CREDENTIALS.ADMIN_PASSWORD);
            await page.waitForURL(/\/dashboard/);
            await expect(dashboardPage.dashboardHeader).toBeVisible();
        });

        await test.step('Logout', async () => {
            await dashboardPage.userMenu.click();
            await dashboardPage.userDropdown.getByText('Logout').click();
            await expect(page).toHaveURL(loginPage.getLoginUrlPattern());
            await expect(loginPage.loginButton).toBeVisible();
        });
    });
});
