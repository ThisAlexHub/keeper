import { test, expect } from '../fixtures/test-base';
import { TEST_CREDENTIALS } from '../utils/helpers';

/**
 * Smoke: Navigation (Sidebar)
 * Why critical: Catches broken routing and sidebar navigation issues.
 */

test.describe('Smoke: Navigation (Sidebar)', () => {


    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('navigates to core modules via sidebar', async ({
        loginPage,
        dashboardPage,
        page,
    }) => {
        await test.step('Login as Admin', async () => {
            await loginPage.login(
                TEST_CREDENTIALS.ADMIN_USERNAME,
                TEST_CREDENTIALS.ADMIN_PASSWORD
            );

            await dashboardPage.waitForDashboard();
            await expect(dashboardPage.dashboardHeader).toBeVisible();

            await expect(dashboardPage.sidebar).toBeVisible();
        });

        await test.step('PIM → Employee Information', async () => {
            await dashboardPage.sidebarPim.click();

            await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
            await expect(
                page.getByRole('heading', { name: /Employee Information/i })
            ).toBeVisible();

            await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
            await expect(
                page.locator('.oxd-input-group:has(label:has-text("Employee Name")) input')
            ).toBeVisible();
        });

        await test.step('Leave → Leave List', async () => {
            await dashboardPage.sidebarLeave.click();

            await expect(page).toHaveURL(/\/leave\/viewLeaveList/);
            await expect(
                page.getByRole('heading', { name: /Leave List/i })
            ).toBeVisible();

            await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
            await expect(
                page.locator('.oxd-input-group:has(label:has-text("From Date")) input')
            ).toBeVisible();
        });

        await test.step('Admin → System Users', async () => {
            await dashboardPage.sidebarAdmin.click();

            await expect(page).toHaveURL(/\/admin\/viewSystemUsers/);
            await expect(
                page.getByRole('heading', { name: /System Users/i })
            ).toBeVisible();

            await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
            await expect(
                page.locator('.oxd-input-group:has(label:has-text("Username")) input')
            ).toBeVisible();
        });
    });
});

