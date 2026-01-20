import { test, expect } from '../fixtures/test-base';
import { TEST_CREDENTIALS } from '../utils/helpers';

/**
 * Smoke: Login (Happy Path)
 *
 * Why critical: Auth gate + proves the app is usable after login.
 */


test.describe('Smoke: Login (Happy Path)', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('logs in and loads dashboard with user menu', async ({ loginPage, dashboardPage, page }) => {
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(TEST_CREDENTIALS.ADMIN_USERNAME, TEST_CREDENTIALS.ADMIN_PASSWORD);
            await expect(page).toHaveURL(loginPage.getDashboardUrlPattern());
        });

        await test.step('Verify dashboard core UI is visible', async () => {
            await expect(dashboardPage.dashboardHeader).toBeVisible();
            await expect(dashboardPage.sidebar).toBeVisible();
            await expect(dashboardPage.timeAtWorkWidget).toBeVisible();
            await expect(dashboardPage.myActionsWidget).toBeVisible();
            await expect(dashboardPage.userMenu).toBeVisible();
        });

        await test.step('Open user menu and verify dropdown content', async () => {
            await dashboardPage.userMenu.click();
            await expect(dashboardPage.userDropdown).toBeVisible();
            await expect(dashboardPage.userDropdown.getByText('Logout')).toBeVisible();
        });
    });
});