import { test } from "@playwright/test"

import { ContactPage } from "../../page-objects/ContactPage"
import { orderTrackingDetails } from "../../test-data/orderDetails.js"

let contactPage

test.beforeEach(async ({page}) => {
    contactPage = new ContactPage(page)
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/contact", { waitUntil: "load" })
})

test("Verify Information section with details is visible on Contact page", async ({}) => {
    await contactPage.verifyInformationSectionWithDetailsIsVisible()
})

test("Verify Order Tracking section is visible on Contact page", async ({}) => {
    await contactPage.verifyOrderTrackingSectionIsVisible()
})

for (const order of orderTrackingDetails) {
    test(`Verify user can track order ${order.orderId}`, async ({page}) => {
        await contactPage.fillOrderTrackingDetails(order.orderId, order.email)
        await contactPage.clickTrackOrderButton()
        await contactPage.verifyOrderConfirmationDetails(order.orderId)
    })
}