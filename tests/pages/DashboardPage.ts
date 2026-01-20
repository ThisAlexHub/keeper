import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;
    readonly timeAtWorkWidget: Locator;
    readonly myActionsWidget: Locator;
    readonly userMenu: Locator;
    readonly userDropdown: Locator;
    readonly sidebarPim: Locator;
    readonly sidebarLeave: Locator;
    readonly sidebarAdmin: Locator;
    readonly sidebar: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
        this.timeAtWorkWidget = page.locator('.orangehrm-dashboard-widget').filter({ hasText: 'Time at Work' }).first();
        this.myActionsWidget = page.locator('.orangehrm-dashboard-widget').filter({ hasText: 'My Actions' }).first();
        this.userMenu = page.locator('.oxd-userdropdown-tab');
        this.userDropdown = page.locator('.oxd-dropdown-menu');

        // Sidebar
        this.sidebarPim = this.page.getByRole('link', { name: 'PIM' });
        this.sidebarLeave = this.page.getByRole('link', { name: 'Leave' });
        this.sidebarAdmin = this.page.getByRole('link', { name: 'Admin' });

        this.sidebar = page.locator('aside.oxd-sidepanel');
    }

    async waitForDashboard(): Promise<void> {
        await this.page.waitForURL(/.*dashboard.*/);
    }
}
