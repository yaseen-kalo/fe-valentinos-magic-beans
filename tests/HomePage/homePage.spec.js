import { test } from "@playwright/test"

import { Home } from "../../page-objects/HomePage"

let homePage

test.beforeEach(async({page}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/")  
})

test("Verify Shop Coffee button on the Home Page is visible and navigates to the Shop page", async({page}) => {
    homePage = new Home(page)
    await homePage.clickOnShopCoffeeButton()   

})

test("Verify Our Story button on the Home Page is visible and navigates to the About page", async({page}) => {
    homePage = new Home(page)
    await homePage.clickOnOurStoryButton()   

})

test("Verify View All Products button on the Home Page is visible and navigates to the Shop page", async({page}) => {
    homePage = new Home(page)
    await homePage.clickOnViewAllProductsButton()   

})