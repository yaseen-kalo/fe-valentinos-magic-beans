import { expect } from "@playwright/test";
import { navigateToShopUsingLocator } from "../utils/helpers/navigationHelpers";

export class Home {
    constructor(page) {
        this.page = page
        this.btnShopCoffeeLocator = page.getByRole('button', { name: 'Shop Coffee' })
        this.btnOurStoryLocator = page.getByRole('button', { name: 'Our Story' })
        this.btnViewAllProductLocator = page.getByRole('button', { name: 'View All Products' })
        this.aboutBannerLocator = page.locator("main h1")
        this.productBannerLocator = page.locator(".text-center h1")

    }

    clickOnShopCoffeeButton = async() => {
        await this.btnShopCoffeeLocator.waitFor()
        await navigateToShopUsingLocator(this.btnShopCoffeeLocator, this.page, this.productBannerLocator)
    }

    clickOnOurStoryButton = async() => {
        await this.btnOurStoryLocator.waitFor()
        await this.btnOurStoryLocator.click()
        await expect(this.page).toHaveURL(/about/)
        await expect(this.aboutBannerLocator).toHaveText(/404/)
    }

    clickOnViewAllProductsButton = async() => {
        await this.btnViewAllProductLocator.waitFor()
        await navigateToShopUsingLocator(this.btnViewAllProductLocator, this.page, this.productBannerLocator)
    }
}