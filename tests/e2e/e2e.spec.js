import { test } from "@playwright/test"

import { ShopPage } from "../../page-objects/ShopPage.js"
import { SignUpPage } from "../../page-objects/SignUpPage.js"
import { signUpTestData } from "../../test-data/signUpData"
import { saveLoginCredentials } from "../../utils/helpers/testDataWriter.js"
import { coffeeList } from "../../test-data/coffeeData.js"
import { NavigationBar } from "../../page-objects/Components/NavigationBar.js"
import { CartPage } from "../../page-objects/CartPage.js"
import { SignInPage } from "../../page-objects/SignInPage.js"
import { CheckoutPage } from "../../page-objects/CheckoutPage.js"
import { checkoutInfo } from "../../test-data/checkoutData.js"
import { OrderConfirmation } from "../../page-objects/OrderConfirmation.js"
import { ContactPage } from "../../page-objects/ContactPage.js"


let signUp
let shopPage
let signIn
let navigationBar
let cartPage
let checkoutPage
let orderConfirmation
let contactPage

test.beforeEach(async ({ page }) => {
  signUp = new SignUpPage(page)
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/signup", { waitUntil: "load" })
})

for (const user of signUpTestData) {
  test(`E2E: User can sign up, log in, and complete a purchase`, async ({ page }) => {
    navigationBar = new NavigationBar(page)
    shopPage = new ShopPage(page)
    signIn = new SignInPage(page)
    cartPage = new CartPage(page)
    checkoutPage = new CheckoutPage(page)
    orderConfirmation = new OrderConfirmation(page)
    contactPage = new ContactPage(page)

    // // Sign up
    await signUp.createAndAccountWithValidData(user.firstName, user.lastName, user.email, user.password);
    await signUp.enterOTPAndConfirmAccount(user.email);
    await saveLoginCredentials({ email: user.email, password: user.password });

    // Login
    await navigationBar.navigateToLogin({ waitUntil: "load" });
    await signIn.successfulSignIn(user.email, user.password);
    console.info("User logged in successfully.");

    // Shop
    await navigationBar.navigateToShop({ waitUntil: "load" });

    for (const coffee of coffeeList) {
      await shopPage.addCoffeeToBasket(coffee.name, coffee.quantity);
    }

    await navigationBar.navigateToBasket({ waitUntil: "load" });

    // Cart

    await cartPage.calculateCartItemsTotal()
    await cartPage.verifyCartItemAndQuantityIsVisible(coffeeList);
    await cartPage.proceedToCheckout();

    console.info("Proceeded to checkout page.");

    // await page.waitForTimeout(2000);
    // Checkout
    for (const co of checkoutInfo) {
      await checkoutPage.fillShippingDetails(co.address.firstName, co.address.lastName, co.address.email, co.address.address, co.address.city, co.address.postalCode, co.address.country);
      // await checkoutPage.fillShippingDetailsFore2e(co.address.address, co.address.city, co.address.postalCode, co.address.country);
      await checkoutPage.fillPaymentDetails(co.creditCard.cardHolderName, co.creditCard.cardNumber, co.creditCard.expiryDate, co.creditCard.cvv);
    }
    // await checkoutPage.placeOrderWithValidDetails();
     const orderData =await checkoutPage.clickPlaceOrderAndGetOrderDetails();
    console.info("Order placed, navigating to order confirmation page.");

    console.info("Order placed successfully.");
    console.info(orderData)

    // Order tracking
    await orderConfirmation.navigateToOrderTracking();
    await contactPage.fillOrderTrackingDetails(orderData.orderId, orderData.orderEmail);
    console.info("E2E purchase flow verified successfully.");

  });
}
