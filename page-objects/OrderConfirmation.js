import { expect } from "@playwright/test";

export class OrderConfirmation {
    constructor(page) {
        this.page = page;
        this.confirmationMessageLocator = page.locator("h3")
        this.btnTrackOrderLocator = page.getByRole("button", { name: "Track Your Order" })
        this.btnContinueShoppingLocator = page.getByRole("button", { name: "Continue Shopping" })
        this.contactBannerLocator = page.locator(".text-4xl")
        this.orderIdLocator = page.locator('[class="text-2xl md:text-4xl font-mono font-bold text-coffee-900 tracking-wider break-all"]');
        this.orderEmailLocator = page.locator(".p-8 strong")
    }


    navigateToOrderTracking = async () => {
        await expect(this.btnTrackOrderLocator).toBeVisible();
        await this.btnTrackOrderLocator.click();
        console.info("Clicked on Track Your Order button");
        await expect(this.contactBannerLocator).toBeVisible({ timeout: 15000 });
        console.info("Navigated to contact page.");
        await expect(this.page).toHaveURL(/contact/);
    }

    navigateToContinueShopping = async () => {
        await expect(this.btnContinueShoppingLocator).toBeVisible();
        await this.btnContinueShoppingLocator.click();
        console.info("Clicked on Continue Shopping button");
        await expect(this.page).toHaveURL(/products/);
    }
}
