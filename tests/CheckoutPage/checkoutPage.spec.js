import { test } from "@playwright/test"

import { CheckoutPage } from "../../page-objects/CheckoutPage.js"
import { checkoutInfo } from "../../test-data/checkOutData.js"
import { NavigationBar } from "../../page-objects/components/NavigationBar.js"
import { ShopPage } from "../../page-objects/ShopPage.js"
import { CartPage } from "../../page-objects/CartPage.js"

let checkoutPage
let shopPage
let cartPage
let navigationBar

test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/products", { waitUntil: "load" })
})


test(`Verify user can complete checkout process with valid delivery address`, async ({ page }) => {
    shopPage = new ShopPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    navigationBar = new NavigationBar(page)

    await shopPage.addCoffeeToBasket("Italian Dark Roast", 2)
    await navigationBar.navigateToBasket()
    await cartPage.proceedToCheckout()
    for (const co of checkoutInfo) {
        await checkoutPage.fillShippingDetails(
            co.address.firstName,
            co.address.lastName,
            co.address.email,
            co.address.address,
            co.address.city,
            co.address.postalCode,
            co.address.country
        )

        await checkoutPage.fillPaymentDetails(
            co.creditCard.cardHolderName,
            co.creditCard.cardNumber,
            co.creditCard.expiryDate,
            co.creditCard.cvv
        )
    }
    await checkoutPage.clickPlaceOrderAndGetOrderDetails()
    await page.waitForTimeout(2000)
});

test(`Verify check validation errors when required fields are left blank`, async ({ page }) => {
    shopPage = new ShopPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    navigationBar = new NavigationBar(page)

    await shopPage.addCoffeeToBasket("Italian Dark Roast", 2)
    await navigationBar.navigateToBasket()
    await cartPage.proceedToCheckout()
    await checkoutPage.fillEmptyShippingDetails()
    await checkoutPage.fillEmptyPaymentDetails()

    await checkoutPage.placeOrderWithEmptyDetails()

    await checkoutPage.verifyShippingErrors()
    await checkoutPage.verifyPaymentErrors()
    await page.waitForTimeout(3000)
});