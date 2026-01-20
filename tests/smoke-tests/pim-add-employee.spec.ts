import { test, expect } from '../fixtures/test-base';
import { TEST_CREDENTIALS } from '../utils/helpers';

/**
 * Smoke: PIM - Add Employee
 * Why critical: Verifies a new employee can be created and Personal Details is shown.
 * 
 */

test.describe('Smoke: PIM - Add Employee', () => {

    test('adds employee and lands on Personal Details', async ({
        loginPage,
        dashboardPage,
        pimPage,
        page,
    }) => {
        const id = Date.now();
        const firstName = `SmokeFirst_${id}`;
        const lastName = `SmokeLast_${id}`;

        await test.step('Login as Admin', async () => {
            await loginPage.goto();
            await loginPage.login(TEST_CREDENTIALS.ADMIN_USERNAME, TEST_CREDENTIALS.ADMIN_PASSWORD);

            await dashboardPage.waitForDashboard();
            await expect(dashboardPage.dashboardHeader).toBeVisible();
        });

        await test.step('Create employee', async () => {
            await pimPage.openAddEmployee();
            await pimPage.addEmployee(firstName, lastName);
            await pimPage.waitForPersonalDetailsPage();
        });


        await test.step('Verify employee name on Personal Details', async () => {
            await expect(pimPage.personalDetailsName).toContainText(firstName);
            await expect(pimPage.personalDetailsName).toContainText(lastName);
        });

        await test.step('Cleanup: delete created employee', async () => {
            await pimPage.deleteEmployeeByName(firstName, lastName);
        });


    });
});

