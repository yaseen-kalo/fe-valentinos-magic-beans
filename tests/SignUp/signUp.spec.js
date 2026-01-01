import { test } from "@playwright/test"

import { SignUpPage } from "../../page-objects/SignUpPage.js"
import { signUpTestData } from "../../test-data/signUpData.js"
import { saveLoginCredentials } from "../../utils/helpers/testDataWriter.js"

let signUp
test.beforeEach(async({page}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/signup", { waitUntil: "load" })  
})
for (const user of signUpTestData) {
    test.skip("Verify "+ user.testName+ " can sign up successfully with valid details", async ({page})=> {
    signUp = new SignUpPage(page)
    await signUp.createAndAccountWithValidData(
        user.firstName, 
        user.lastName,
        user.email,
        user.password )
    await signUp.enterOTPAndConfirmAccount(user.email)
    await saveLoginCredentials({email: user.email, password: user.password})

})}

test("Verify error messages are displayed when user tries to sign up without providing required details", async ({page})=> {
    signUp = new SignUpPage(page)
    await signUp.createAnAccountWithEmptyFileds()
})

test("Verify link login button takes user to Login page", async ({page})=> {
    signUp = new SignUpPage(page)
    await signUp.navigateToLogin()
})