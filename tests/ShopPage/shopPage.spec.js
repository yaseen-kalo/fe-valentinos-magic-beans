import { test } from "@playwright/test"

import { ShopPage } from "../../page-objects/ShopPage.js"
import { coffeeList } from "../../test-data/coffeeData.js"

let shopPage

test.beforeEach(async({page}) => {
    shopPage = new ShopPage(page)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/products", { waitUntil: "load" })  
    })

for (const coffee of coffeeList) {
    test(`Verify user can add "${coffee.name}" x${coffee.quantity} to the basket`, async ({page}) => {
    await shopPage.addCoffeeToBasket(coffee.name, coffee.quantity)
    await page.waitForTimeout(3000)
})
}

for (const coffee of coffeeList) {
test(`Verify user can navigate to ${coffee.name} details page with correct URL`, async ({ page }) => {
  await shopPage.viewProductDetails(coffee.name);
})
}