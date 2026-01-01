import { expect } from "@playwright/test"
import { getOTP } from "../utils/helpers/getOTPHelper.js"

export class SignUpPage {
    constructor(page) {
        this.page = page
        this.txtFirstNameLocator = page.getByPlaceholder("Max")
        this.txtLastNameLocator = page.getByPlaceholder("Robinson")
        this.txtEmailLocator = page.getByPlaceholder("m@example.com")
        this.txtPasswordLocator = page.locator("[data-test-id='signup-password-input']")
        this.btnCreateAnAccountLocator = page.getByRole('button', {name: "Create an account"})
        this.linkLoginLocator = page.locator("[data-test-id='signup-login-link']")

        this.codeMessageLocator = page.locator(".text-muted-foreground")
        this.txtCodeLocator = page.getByRole('textbox')
        this.btnConfirmAccount = page.getByRole('button', {name: 'Confirm Account'})

        this.labelConfirmLocator = page.locator(".grid .font-semibold")
        this.successMessageLocator = page.locator(".grid .opacity-90")

        //Error messages:
        this.errorFirstNameLocator = page.locator('p.text-red-500').nth(0)
        this.errorLastNameLocator = page.locator('p.text-red-500').nth(1)
        this.errorEmailLocator = page.locator('p.text-red-500').nth(2)
        this.errorPasswordLocator = page.locator('p.text-red-500').nth(3)
    }

    createAndAccountWithValidData = async(firstName, lastName, email, password) => {
        await this.txtFirstNameLocator.waitFor()
        await this.txtFirstNameLocator.fill(firstName)

        await this.txtLastNameLocator.waitFor()
        await this.txtLastNameLocator.fill(lastName)

        await this.txtEmailLocator.waitFor()
        await this.txtEmailLocator.fill(email)

        await this.txtPasswordLocator.waitFor()
        await this.txtPasswordLocator.fill(password)

        await this.btnCreateAnAccountLocator.waitFor()
        await expect(this.btnCreateAnAccountLocator).toBeVisible()
        await expect(this.btnCreateAnAccountLocator).toHaveText(/Create an account/)
        await this.btnCreateAnAccountLocator.click()

        await expect(this.codeMessageLocator).toHaveText(/We've sent a 6-digit code to /)
    }

    enterOTPAndConfirmAccount = async(email) => {
        const code = await getOTP(email)
        await this.txtCodeLocator.waitFor()
        await expect(this.txtCodeLocator).toBeEmpty()
        await this.txtCodeLocator.fill(code)
        await this.btnConfirmAccount.waitFor()
        await this.btnConfirmAccount.click()
        await expect(this.labelConfirmLocator).toHaveText("Account Confirmed!")
        await expect(this.successMessageLocator).toHaveText("You can now log in with your credentials.")
    }

    createAnAccountWithEmptyFileds = async() => {
        await this.txtFirstNameLocator.waitFor()
        await this.txtFirstNameLocator.clear()

        await this.txtLastNameLocator.waitFor()
        await this.txtLastNameLocator.clear()

        await this.txtEmailLocator.waitFor()
        await this.txtEmailLocator.clear()

        await this.txtPasswordLocator.waitFor()
        await this.txtPasswordLocator.clear()

        await this.btnCreateAnAccountLocator.waitFor()
        await expect(this.btnCreateAnAccountLocator).toBeVisible()
        await expect(this.btnCreateAnAccountLocator).toHaveText(/Create an account/)
        await this.btnCreateAnAccountLocator.click()

        await expect(this.errorFirstNameLocator).toHaveText("First name must be at least 2 characters.")
        await expect(this.errorLastNameLocator).toHaveText("Last name must be at least 2 characters.")
        await expect(this.errorEmailLocator).toHaveText("Please enter a valid email address.")
        await expect(this.errorPasswordLocator).toHaveText("Password must be at least 8 characters.")
    }
    
    navigateToLogin = async() => {
        await expect(this.linkLoginLocator).toBeVisible()
        await this.linkLoginLocator.click()
        await expect(this.page).toHaveURL(/login/)
    }
}