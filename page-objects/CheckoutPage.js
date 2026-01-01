import { expect } from "@playwright/test";

export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.txtFirstNameLocator = page.locator("input[name='firstName']")
        this.txtLastNameLocator = page.locator("[data-test-id='checkout-lastname-input']")
        this.txtEmailLocator = page.locator("[data-test-id='checkout-email-input']")
        this.txtAddressLocator = page.locator("[data-test-id='checkout-address-input']")
        this.txtCityLocator = page.locator("[data-test-id='checkout-city-input']")
        this.txtPostalCodeLocator = page.locator("[data-test-id='checkout-zipcode-input']")
        this.txtCountryLocator = page.locator("[data-test-id='checkout-country-input']")

        this.txtCCNameLocator = page.locator("[data-test-id='checkout-cardname-input']")
        this.txtCCNumberLocator = page.locator("[data-test-id='checkout-cardnumber-input']")
        this.txtCCExpiryLocator = page.locator("[data-test-id='checkout-cardexpiry-input']")
        this.txtCCCVVLocator = page.locator("[data-test-id='checkout-cardcvc-input']")

        //Error

        this.errorFirstNameLocator = page.getByText('First name is required.', { exact: true })
        this.errorLastNameLocator = page.getByText('Last name is required.', { exact: true })
        this.errorEmailLocator = page.getByText('Please enter a valid email.', { exact: true })
        this.errorAddressLocator = page.getByText('Address is required.', { exact: true })
        this.errorCityLocator = page.getByText('City is required.', { exact: true })
        this.errorPostalCodeLocator = page.getByText(/ZIP code must be 5 digits./, { exact: true })

        this.errorCCNameLocator = page.getByText('Name on card is required.', { exact: true })
        this.errorCCNumberLocator = page.getByText('Please enter a valid 16-digit card number.', { exact: true })
        this.errorCCExpiryLocator = page.getByText('Expiry must be in MM/YY format.', { exact: true })
        this.errorCCCVVLocator = page.getByText('CVC must be 3 or 4 digits.', { exact: true })

        this.btnPlaceOrderLocator = page.locator('[data-test-id="place-order-button"]')
        this.orderConfirmationLocator = page.locator(".bg-green-50 .tracking-tight")
        // this.orderIdLocator = page.locator(".p-6 p:nth-of-type(2)");
        this.orderIdLocator = page.locator('[class="text-2xl md:text-4xl font-mono font-bold text-coffee-900 tracking-wider break-all"]');
        this.orderEmailLocator = page.locator(".p-8 strong")
        // this.confirmationContainerLocator = page.getByText(
        //     "Thank you for your purchase. Your order has been placed successfully."
        // )
    }

    fillShippingDetails = async (firstName, lastName, email, address, city, postalCode, country) => {
        await this.page.evaluate(() => {
            document
                .querySelectorAll(
                    '[data-test-id^="checkout-"] input[disabled], input[data-test-id][disabled]'
                )
                .forEach(input => {
                    input.removeAttribute('disabled');
                });
        });
        await expect(this.txtFirstNameLocator).toBeVisible();
        await this.txtFirstNameLocator.clear()
        await this.txtFirstNameLocator.fill(firstName)
        await expect(this.txtLastNameLocator).toBeVisible()
        await this.txtLastNameLocator.clear()
        await this.txtLastNameLocator.fill(lastName)
        await expect(this.txtEmailLocator).toBeVisible();
        await this.txtEmailLocator.clear()
        await this.txtEmailLocator.fill(email)
        await expect(this.txtAddressLocator).toBeVisible();
        await this.txtAddressLocator.fill(address)
        await expect(this.txtCityLocator).toBeVisible();
        await this.txtCityLocator.fill(city)
        await expect(this.txtPostalCodeLocator).toBeVisible();
        await this.txtPostalCodeLocator.fill(postalCode)
        await expect(this.txtCountryLocator).toBeVisible();
        await this.txtCountryLocator.clear()
        await this.txtCountryLocator.fill(country)
        console.info("Filled shipping details");
    }

    fillPaymentDetails = async (ccName, ccNumber, ccExpiry, ccCVV) => {
        await this.txtCCNameLocator.fill(ccName)
        await this.txtCCNumberLocator.fill(ccNumber)
        await this.txtCCExpiryLocator.fill(ccExpiry)
        await this.txtCCCVVLocator.fill(ccCVV)
        console.info("Filled payment details");
    }

    clickPlaceOrderAndGetOrderDetails = async () => {
        await expect(this.btnPlaceOrderLocator).toBeEnabled({ timeout: 10000 });
        await this.btnPlaceOrderLocator.click();
        console.info("Clicked Place Order button");

        await expect(this.orderIdLocator).toBeVisible({ timeout: 30000 });


        const orderId = (await this.orderIdLocator.textContent())?.trim();
        console.log('Order ID:', orderId);


        // Extract order email
        const orderEmail = (await this.orderEmailLocator.textContent())?.trim();

        console.info(`Order placed: ID=${orderId}, Email=${orderEmail}`);
        return { orderId, orderEmail };
    };

    placeOrderWithEmptyDetails = async () => {
        await expect(this.btnPlaceOrderLocator).toBeVisible();
        await this.btnPlaceOrderLocator.click();
        console.info("Clicked on Place Order button");
        await expect(this.page).toHaveURL(/checkout/);
    }

    fillEmptyShippingDetails = async () => {
        await this.txtFirstNameLocator.fill("")
        await this.txtLastNameLocator.fill("")
        await this.txtEmailLocator.fill("")
        await this.txtAddressLocator.fill("")
        await this.txtCityLocator.fill("")
        await this.txtPostalCodeLocator.fill("")
        await this.txtCountryLocator.fill("")
        console.info("Cleared shipping details");
    }

    fillEmptyPaymentDetails = async () => {
        await this.txtCCNameLocator.fill("")
        await this.txtCCNumberLocator.fill("")
        await this.txtCCExpiryLocator.fill("")
        await this.txtCCCVVLocator.fill("")
        console.info("Cleared payment details");
    }

    verifyShippingErrors = async () => {
        await expect(this.errorFirstNameLocator).toHaveText('First name is required.');
        await expect(this.errorLastNameLocator).toHaveText('Last name is required.');
        await expect(this.errorEmailLocator).toHaveText('Please enter a valid email.');
        await expect(this.errorAddressLocator).toHaveText('Address is required.');
        await expect(this.errorCityLocator).toHaveText('City is required.');
        await expect(this.errorPostalCodeLocator).toHaveText(/ZIP code must be 5 digits./);
        console.info("Verified shipping error messages are visible and correct");
    }

    verifyPaymentErrors = async () => {
        await expect(this.errorCCNameLocator).toHaveText('Name on card is required.');
        await expect(this.errorCCNumberLocator).toHaveText('Please enter a valid 16-digit card number.');
        await expect(this.errorCCExpiryLocator).toHaveText('Expiry must be in MM/YY format.');
        await expect(this.errorCCCVVLocator).toHaveText('CVC must be 3 or 4 digits.');
        console.info("Verified payment error messages are visible and correct");
    }
}