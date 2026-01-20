import { Page, Locator, expect } from '@playwright/test';

export class PIMPage {
    readonly page: Page;

    // Add Employee form
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly employeeIdInput: Locator;
    readonly saveButton: Locator;

    // Personal Details page
    readonly personalDetailsHeader: Locator;
    readonly personalDetailsName: Locator;

    constructor(page: Page) {
        this.page = page;

        // Add Employee
        this.firstNameInput = page.locator('input[name="firstName"]');
        this.lastNameInput = page.locator('input[name="lastName"]');
        this.saveButton = page.getByRole('button', { name: 'Save' });

        // Personal Details (anchors)
        this.personalDetailsHeader = page.getByRole('heading', { name: /Personal Details/i });

        // OrangeHRM shows employee name on the Personal Details header area
        this.personalDetailsName = page.locator('.orangehrm-edit-employee-name');

        this.employeeIdInput = page.locator(
            '.oxd-input-group:has(label:has-text("Employee Id")) input'
        );
    }



    async openAddEmployee(): Promise<void> {
        // Most reliable for demo app (avoids ambiguous "Add" button)
        await this.page.goto('/web/index.php/pim/addEmployee', {
            waitUntil: 'domcontentloaded',
            timeout: 60_000,
        });

        await expect(this.firstNameInput).toBeVisible();
    }

    async addEmployee(firstName: string, lastName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        const uniqueEmpId = `E${Date.now().toString().slice(-8)}`;
        await this.employeeIdInput.fill(uniqueEmpId);
        await this.saveButton.click();
    }

    async waitForPersonalDetailsPage(): Promise<void> {
        await this.page.waitForURL(/\/pim\/viewPersonalDetails/);
        await expect(this.personalDetailsHeader).toBeVisible();
    }

    async deleteEmployeeByName(firstName: string, lastName: string): Promise<void> {
        await this.page.goto('/web/index.php/pim/viewEmployeeList');

        await this.page
            .locator('.oxd-input-group:has(label:has-text("Employee Name")) input')
            .fill(`${firstName} ${lastName}`);

        await this.page.getByRole('button', { name: 'Search' }).click();

        const row = this.page.locator('.oxd-table-row').filter({
            hasText: firstName,
        });

        if (await row.count() === 0) {
            return;
        }

        await row.locator('.oxd-icon.bi-trash').first().click();
        await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    }
}
