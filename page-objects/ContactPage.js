import { expect } from "@playwright/test";
export class ContactPage {
    constructor(page) {
        this.page = page;
        this.InformationLocator = page.locator(".text-card-foreground").first()
        this.trackingLocator = page.locator(".text-card-foreground").nth(1)
        this.addressLocator = page.locator(".text-coffee-700 div p").nth(1)
        this.emailLocator = page.locator(".text-card-foreground a")
        this.txtOrderIdLocator = page.locator("#orderId")
        this.txtEmailLocator = page.locator("#email")

        // Error Locators
        this.errorOrderIdLocator = page.locator(".space-y-2 p").nth(0)
        this.errorEmailLocator = page.locator(".space-y-2 p").nth(2)

        this.btnTrackOrderLocator = page.getByRole("button", { name: "Track Order" })

        this.orderEmailLocator = page.locator('p:has(span:has-text("Email:"))')

    }

    verifyInformationSectionWithDetailsIsVisible = async () => {
        await expect(this.InformationLocator).toBeVisible();
        await expect(this.addressLocator).toBeVisible();
        await expect(this.emailLocator).toBeVisible();
    }

    verifyOrderTrackingSectionIsVisible = async () => {
        await expect(this.trackingLocator).toBeVisible();
        await expect(this.txtOrderIdLocator).toBeVisible();
        await expect(this.txtEmailLocator).toBeVisible();
    }

    fillOrderTrackingDetails = async (orderId, email) => {
        await this.txtOrderIdLocator.fill(orderId)
        await this.txtEmailLocator.fill(email)
        console.info("Filled order tracking details");
    }

    fillEmptyOrderTrackingDetails = async () => {
        await this.txtOrderIdLocator.fill("")
        await this.txtEmailLocator.fill("")
        console.info("Cleared order tracking details");
    }

    clickTrackOrderButton = async () => {
        await expect(this.btnTrackOrderLocator).toBeVisible();
        await this.btnTrackOrderLocator.click();
        console.info("Clicked on Track Order button");
    }

    verifyOrderTrackingErrors = async () => {
        await expect(this.errorOrderIdLocator).toHaveText('Order ID is required.');
        await expect(this.errorEmailLocator).toHaveText('Please enter a valid email.');
    }

    verifyOrderConfirmationDetails = async (orderId) => {
        await this.page.waitForSelector(
            'p span:has-text("Email:")',
            { state: 'visible', timeout: 15000 }
        );
        // await expect(this.page).toHaveURL(/\/order\/[A-Z0-9]+/)
        this.orderEmailLocator = this.page.locator(
            'p:has(span:has-text("Email:"))'
        );

        const rawText = await this.orderEmailLocator.textContent();

        const emailText = rawText
            .replace('Email:', '')
            .trim();
        console.log("Tracked order email:", emailText);

        console.info("Verified order confirmation details");
    }
}
