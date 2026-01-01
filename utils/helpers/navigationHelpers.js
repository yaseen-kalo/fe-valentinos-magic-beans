// Helper method to navigate to the Shop page, works for both the navbar link 
    // and the "Shop Coffee" button
export const navigateToShopUsingLocator = async (locator, page, bannerLocator) => {
    await locator.scrollIntoViewIfNeeded();
    await expect(locator).toBeVisible({timeout: 10000});

    await locator.click()
    await expect(page).toHaveURL(/products/);
    await expect(bannerLocator).toHaveText("Our Coffee Collection")
} 