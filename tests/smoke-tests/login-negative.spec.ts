import { test, expect } from '../fixtures/test-base';
import { TEST_CREDENTIALS } from '../utils/helpers';

/**
 * Smoke: Login (Negative)
 * Why critical: Ensures invalid credentials are handled correctly.
 */


test.describe('Smoke Test: Login (Negative)', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    async function assertInvalidLogin(loginPage: any, page: any) {
        const errorMessage = await loginPage.getErrorMessage();

        expect(errorMessage).toBeTruthy();
        expect(errorMessage?.toLowerCase()).toContain('invalid credentials');

        await expect(page).toHaveURL(loginPage.getLoginUrlPattern());
        await expect(page.getByPlaceholder('Username')).toBeVisible();
    }

    test('shows error with wrong password', async ({ loginPage, page }) => {
        await loginPage.login(
            TEST_CREDENTIALS.ADMIN_USERNAME,
            TEST_CREDENTIALS.INVALID_PASSWORD
        );

        await assertInvalidLogin(loginPage, page);
    });

    test('shows error with wrong username', async ({ loginPage, page }) => {
        await loginPage.login(
            TEST_CREDENTIALS.INVALID_USERNAME,
            TEST_CREDENTIALS.ADMIN_PASSWORD
        );

        await assertInvalidLogin(loginPage, page);
    });
});