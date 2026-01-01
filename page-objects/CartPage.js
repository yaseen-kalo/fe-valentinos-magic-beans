import { expect } from "@playwright/test";

import { parsePrice } from "../utils/helpers/parsePrice.js";

export class CartPage {
    constructor(page) {
        this.page = page;
        this.btnStartShoppingLocator = page.locator(".bg-white Button")
        this.cartItemLocator = page.locator(".flex-1 h3")
        this.cartItemQuantityLocator = page.locator("span[data-test-id*='quantity-']")
        this.btnItemQuantityDecreaseLocator = page.locator("[data-test-id*='quantity-decrease-']")
        this.btnItemQuantityIncreaseLocator = page.locator("[data-test-id*='quantity-increase-']")

        this.cartItemPriceLocator = page.locator(".text-right .text-lg")
        this.GrandTotalPriceLocator = page.locator("[data-test-id=total-price]")
        this.itemTotalLocator = page.locator(".sticky span").nth(1)

        this.btnProceedToCheckoutLocator = page.locator("[data-test-id='proceed-to-checkout']")
        this.btnContinueShoppingLocator = page.getByRole("button", { name: "Continue Shopping" })
    }

    startShopping = async () => {
        await expect(this.btnStartShoppingLocator).toBeVisible();
        await this.btnStartShoppingLocator.click();
        console.info("Clicked on Start Shopping button");
    }

    verifyCartItemAndQuantityIsVisible = async (coffeeName, expectedQty) => {
        const count = await this.cartItemLocator.count();

        for (let i = 0; i < count; i++) {
            const name = (await this.cartItemLocator.nth(i).innerText())?.trim();

            if (name === coffeeName) {
                await expect(this.cartItemLocator.nth(i)).toBeVisible();
                await this.increaseItemQuantity()
                expectedQty += 1; // Adjust expected quantity after increase

                await this.decreaseItemQuantity()
                expectedQty -= 1; // Adjust expected quantity after decrease

                const qtyText = (await this.cartItemQuantityLocator
                    .nth(i)
                    .innerText())?.trim();

                // Extract number from text like "Quantity: 2"
                const actualQty = Number(qtyText.match(/\d+/)?.[0]);
                console.log("Quantity raw text:", qtyText);

                expect(actualQty).toBe(expectedQty);

                console.info(
                    `✅ Verified ${coffeeName} is visible with quantity ${expectedQty}`
                );
                return;
            }
        }

        console.log(` ${coffeeName} not found in the cart`);
    };

    increaseItemQuantity = async () => {
        await expect(this.btnItemQuantityIncreaseLocator).toBeVisible();
        await this.btnItemQuantityIncreaseLocator.click();
        console.info("Clicked on Increase Quantity button");
    }

    decreaseItemQuantity = async () => {
        await expect(this.btnItemQuantityDecreaseLocator).toBeVisible();
        await this.btnItemQuantityDecreaseLocator.click();
        console.info("Clicked on Decrease Quantity button");
    }

    calculateCartItemsTotal = async () => {
        const itemCount = await this.cartItemPriceLocator.count();
        let runningTotal = 0;

        for (let i = 0; i < itemCount; i++) {
            const priceText = (await this.cartItemPriceLocator.nth(i).innerText())?.trim();
            const price = parsePrice(priceText);
            if (isNaN(price)) throw new Error(`Invalid price format: ${priceText}`);
            runningTotal += price;
            console.log(`Item ${i + 1}: price=${price.toFixed(2)}, running subtotal=${runningTotal.toFixed(2)}`);
        }

        const displayedTotalText = (await this.GrandTotalPriceLocator.innerText())?.trim();
        const displayedTotal = parsePrice(displayedTotalText);
        console.log(`Running subtotal: ${runningTotal.toFixed(2)}, Displayed total: ${displayedTotal.toFixed(2)}`);

        const shippingPrice = 5.99;

        if (runningTotal < 50) {
            console.info("Subtotal < $50, shipping should be added.");
            expect(displayedTotal).toBeCloseTo(runningTotal + shippingPrice, 2);
            console.info(`Displayed total ${displayedTotal.toFixed(2)} includes shipping ${shippingPrice.toFixed(2)}`);
        } else {
            console.info("Subtotal >= $50, no shipping should be added.");
            expect(displayedTotal).toBeCloseTo(runningTotal, 2);
            console.info(`Displayed total ${displayedTotal.toFixed(2)} matches subtotal ${runningTotal.toFixed(2)}`);
        }
    }

    proceedToCheckout = async () => {
        await expect(this.btnProceedToCheckoutLocator).toBeVisible();
        await this.btnProceedToCheckoutLocator.click();
        console.info("Clicked on Proceed to Checkout button");
        await expect(this.page).toHaveURL(/checkout/);
    }

    continueToShopping = async () => {
        await expect(this.btnContinueShoppingLocator).toBeVisible();
        await this.btnContinueShoppingLocator.click();
        console.info("Clicked on Continue Shopping button");
        await expect(this.page).toHaveURL(/products/);
    }

}