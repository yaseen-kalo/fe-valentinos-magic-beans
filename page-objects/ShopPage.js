export class ShopPage {
  constructor(page) {
    this.page = page;
    this.cardLocator = page.locator(".bg-card");
    this.coffeeTitleLocator = "h3";
    this.btnAddToBasketLocator = "button:has-text('Add to Cart')";
    this.confirmationMessageLocator = page.locator("[class='text-sm opacity-90']");
    this.btnViewDetailsLocator = ".gap-2 a[href*='/product']"
  }

  addCoffeeToBasket = async (coffeeName, quantity) => {
    await this.cardLocator.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await this.cardLocator.count();
    console.log('Total products:', count);

    for (let i = 0; i < count; i++) {
        const name = (await this.cardLocator
            .nth(i)
            .locator(this.coffeeTitleLocator)
            .innerText())?.trim();

        if (name === coffeeName) {
            if (quantity !== 0) {
                for (let j = 0; j < quantity; j++) {
                    // Re-locate the button inside the loop
                    const addButton = this.cardLocator
                        .nth(i)
                        .locator(this.btnAddToBasketLocator);

                    await expect(addButton).toBeVisible({timeout: 20000});
                    await addButton.click();

                    // Wait for confirmation message to appear
                    await expect(this.confirmationMessageLocator).toHaveText(
                        `${coffeeName} is now in your cart.`
                    );
                    await expect(this.confirmationMessageLocator).toHaveText(`${coffeeName} is now in your cart.`);
                    await this.page.waitForTimeout(500);

                    console.info(`Clicked Add to Basket (${j + 1}/${quantity}) for ${coffeeName}`);
                }
            } else {
                console.info(`Quantity is 0, skipping adding ${coffeeName} to the basket.`);
            }
            break;
        }
    }
};


  viewProductDetails = async (coffeeName) => {
  await this.cardLocator.first().waitFor({ state: "visible", timeout: 10000 });
  const count = await this.cardLocator.count();

  for (let i = 0; i < count; i++) {
    const card = this.cardLocator.nth(i);
    const name = (await card.locator(this.coffeeTitleLocator).innerText())?.trim();

    if (name === coffeeName) {
      // Extract the product ID from data-test-id
      const dataTestId = await card.getAttribute("data-test-id"); // e.g., "product-card-504"
      const productId = dataTestId.split("-").pop(); // "504"

      // Click the View Details button
      await card.locator(this.btnViewDetailsLocator).click();
      console.info(`Clicked on View Details for ${coffeeName} (ID: ${productId})`);

      // Verify URL contains the product ID
      await expect(this.page).toHaveURL(new RegExp(`/products/${productId}`));
      break;
    }
  }
};
}
