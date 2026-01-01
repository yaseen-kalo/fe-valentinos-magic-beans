import { test } from "@playwright/test"

import { CartPage } from "../../page-objects/CartPage"
import { ShopPage } from "../../page-objects/ShopPage.js"
import { NavigationBar } from "../../page-objects/Components/NavigationBar.js"
import { coffeeList } from "../../test-data/coffeeData.js"

let cartPage
let shopPage
let navigationBar

test.beforeEach(async ({page}) => {
    cartPage = new CartPage(page)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/cart", { waitUntil: "load" })
})

test("Verify user can start shopping from Cart page", async ({page}) => {
    cartPage = new CartPage(page)
    shopPage = new ShopPage(page)
    navigationBar = new NavigationBar(page)
    await cartPage.startShopping()
    await shopPage.addCoffeeToBasket("Italian Dark Roast", 2)
    await navigationBar.navigateToBasket()
    await page.waitForTimeout(3000)
})


for(const coffee of coffeeList) {
test(`Verify ${coffee.name} is added and visible in the Cart page`, async ({page}) => {
    cartPage = new CartPage(page)
    shopPage = new ShopPage(page)
    navigationBar = new NavigationBar(page)
    await cartPage.startShopping()
    await shopPage.addCoffeeToBasket(coffee.name, coffee.quantity)
    await navigationBar.navigateToBasket()
    await cartPage.verifyCartItemAndQuantityIsVisible(coffee.name, coffee.quantity)
    await page.waitForTimeout(3000)
})
}

for(const coffee of coffeeList) {
test(`Verify total price is correct when ${coffee.quantity} x ${coffee.name} added`, async ({page}) => {
    cartPage = new CartPage(page)
    shopPage = new ShopPage(page)
    navigationBar = new NavigationBar(page)
    await cartPage.startShopping()
    await shopPage.addCoffeeToBasket(coffee.name, coffee.quantity)
    await navigationBar.navigateToBasket()
    await cartPage.verifyCartItemAndQuantityIsVisible(coffee.name, coffee.quantity)
    await cartPage.calculateCartItemsTotal()
    await page.waitForTimeout(2000)
})
}

test("Verify proceed to checkout button navigates user to checkout page", async ({page}) => {
    cartPage = new CartPage(page)
    shopPage = new ShopPage(page)
    navigationBar = new NavigationBar(page)
    await cartPage.startShopping()
    await shopPage.addCoffeeToBasket("Colombian Supreme", 2)
    await navigationBar.navigateToBasket()
    await cartPage.verifyCartItemAndQuantityIsVisible("Colombian Supreme", 2)
    await cartPage.calculateCartItemsTotal()
    await cartPage.proceedToCheckout()
    await page.waitForTimeout(3000)
})

test("Verify continue shopping button navigates user to products page", async ({page}) => {
    cartPage = new CartPage(page)
    shopPage = new ShopPage(page)
    navigationBar = new NavigationBar(page)

    await cartPage.startShopping()
    await shopPage.addCoffeeToBasket("Colombian Supreme", 2)
    await navigationBar.navigateToBasket()
    await cartPage.verifyCartItemAndQuantityIsVisible("Colombian Supreme", 2)
    await cartPage.calculateCartItemsTotal()
    await cartPage.continueToShopping()
    await page.waitForTimeout(3000)
})