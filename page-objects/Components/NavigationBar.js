import {expect} from "@playwright/test"

import { navigateToShopUsingLocator } from "../../utils/helpers/navigationHelpers.js"
export class NavigationBar {
    constructor (page) {
        this.page = page
        this.websiteLogoLocator = page.locator(".container h1")
        this.websiteBannerLocator = page.locator("section h1")
        this.productBannerLocator = page.locator(".text-center h1")
        this.contactBannerLocator = page.locator(".text-4xl")
        this.loginBarLocator = page.getByRole('link', { name: 'Login' })
        this.navBarLocator = page.locator("nav.md\\:flex")
        this.homeNavLocator = this.navBarLocator.locator('a', {hasText: /Home/i})
        this.shopNavLocator = page.locator('nav a[href="/products"]');
        this.contactNavLocator = this.navBarLocator.locator('a', {hasText: /Contact/i})
        this.loginButtonLocator = page.getByRole('link', {name: "Login"})
        this.signUpButtonLocator = page.getByRole('link', {name: "Sign Up"})
        this.basketLocator = page.locator("[data-test-id='header-cart-button']")
        this.footerDisclaimerLocator = page.locator("footer .text-sm")
        this.loginPageBannerLocator = page.locator("[data-test-id='login-heading']")
        this.signUpPageBannerLocator = page.locator("[data-test-id='header-signup-button-desktop']")
        this.cartPageBannerLocator = page.locator('.container h1').nth(1)
    }

    //methods

    websiteLogo = async () => {
        await expect(this.websiteLogoLocator).toBeVisible()
        await expect(this.websiteLogoLocator).toHaveText("Valentino's Magic Beans")
    }

    navigateToHome = async() => {

        await this.navBarLocator.waitFor({state: 'visible', timeout: 5000})
        await expect(this.homeNavLocator).toBeVisible()
        await this.homeNavLocator.click()
        await expect(this.websiteBannerLocator).toBeVisible()
        await expect(this.websiteBannerLocator).toHaveText("Valentino's Magic Beans")
    }

    navigateToShop = async() => {
        
        await navigateToShopUsingLocator(this.shopNavLocator, this.page, this.productBannerLocator)
    }

    navigateToContact = async() => {
        
        await expect(this.contactNavLocator).toBeVisible()
        await this.contactNavLocator.click()
        await expect(this.page).toHaveURL(/contact/)
        await expect(this.contactBannerLocator).toHaveText(/Contact Us/)
    }

    verifyDesclaimerMessageIsVisible = async() => {
        await expect(this.footerDisclaimerLocator).toBeVisible()
        await expect(this.footerDisclaimerLocator).toHaveText(/it is a project for demonstration and testing purposes only./)
    }

    navigateToLogin = async() => {

        await expect(this.loginBarLocator).toBeVisible()
        await this.loginBarLocator.click()
        await expect(this.loginPageBannerLocator).toHaveText(/Login/)
    }

    navigateToSignUp = async() => {

        await expect(this.signUpButtonLocator).toBeVisible()
        await this.signUpButtonLocator.click()
        await expect(this.signUpButtonLocator).toHaveText("Sign Up")
    }

    navigateToBasket = async() => {

        await expect(this.basketLocator).toBeVisible()
        await this.basketLocator.click()
        await expect(this.cartPageBannerLocator).toHaveText("Your Cart")
    }

}