import { expect } from "@playwright/test";
export class SignInPage {
    constructor(page) {
        this.page = page;
        this.inputEmailLocator = page.locator("input[name='email']");
        this.inputPasswordLocator = page.locator("input[name='password']");
        this.btnSignInLocator = page.locator("button[type='submit']");
        this.linkForgotPasswordLocator = page.locator("a[href='/login']");
        this.loginMenuLocator = page.locator("[aria-haspopup='menu']")
        this.loginnedEmailLocator = page.locator(".font-normal p").nth(1);
        this.logoutEmailLocator = page.locator("[role='menuitem'] span")

        //Error messages
        this.errorEmailLocator = page.getByText('Please enter a valid email address.');
        this.errorPasswordLocator = page.getByText('Password is required.');
        this.errorInvaildUserLocator = page.getByText('User does not exist.', { exact: true })

    }

    openLoginMenu = async () => {
        await this.loginMenuLocator.waitFor({ state: 'visible', timeout: 5000 });
        await this.loginMenuLocator.click();
    }

    successfulSignIn = async(email, password) => {
        await expect(this.page).toHaveURL(/\/login/);

        await this.inputEmailLocator.fill(email);
        await this.inputPasswordLocator.fill(password);
        await this.btnSignInLocator.click();
        console.info(`Signed in with email: ${email}`);
        await this.page.waitForLoadState('networkidle');
        await expect(this.loginMenuLocator).toBeVisible();
        await this.openLoginMenu()
        await expect(this.loginnedEmailLocator).toHaveText(email);
        await this.page.mouse.click(10, 10); // x=10, y=10

    }

    successfulSignOut = async(email, password) => {
        await expect(this.page).toHaveURL(/\/login/);

        await this.inputEmailLocator.fill(email);
        await this.inputPasswordLocator.fill(password);
        await this.btnSignInLocator.click();
        console.info(`Signed in with email: ${email}`);
        await this.page.waitForLoadState('networkidle');
        await expect(this.loginMenuLocator).toBeVisible();
        await this.loginMenuLocator.click();
        await expect(this.loginnedEmailLocator).toHaveText(email);
        await this.logoutEmailLocator.click();
    }

    tryToSignInWithInvalidCredentials = async(email, password) => {
        await expect(this.page).toHaveURL(/\/login/);
        
        await this.inputEmailLocator.fill(email);
        await this.inputPasswordLocator.fill(password);
        await this.btnSignInLocator.click();
        await expect(this.errorInvaildUserLocator).toBeVisible();
        await expect(this.errorInvaildUserLocator).toHaveText("User does not exist.")
        console.info(`Attempted to sign in with email: ${email} and invalid password.`);
    }

    tryToSignInWithoutCredentials = async() => {
        await expect(this.page).toHaveURL(/\/login/);
        
        await this.btnSignInLocator.click();
        console.info(`Attempted to sign in without providing credentials.`);
        await expect(this.errorEmailLocator).toHaveText("Please enter a valid email address.")
        await expect(this.errorPasswordLocator).toHaveText("Password is required.")
    }
}