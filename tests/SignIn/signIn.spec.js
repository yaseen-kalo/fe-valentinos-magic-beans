import { test } from "@playwright/test"

import { SignInPage } from "../../page-objects/SignInPage.js"
import { loginData } from "../../test-data/loginData.js"

let signIn
test.beforeEach(async({page}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login", { waitUntil: "load" })  
})
for (const user of loginData) {
    test(`Verify user can sign in with email: ${user.email}`, async ({page})=> {
    signIn = new SignInPage(page)
    await signIn.successfulSignIn(
        user.email,
        user.password )
})
}

test("Verify validation errors are shown when signing in with empty fields", async ({page})=> {
    signIn = new SignInPage(page)
    await signIn.tryToSignInWithoutCredentials()
})

test("Verify error message is shown when signing in with invalid credentials", async ({page})=> {
    signIn = new SignInPage(page)
    await signIn.tryToSignInWithInvalidCredentials("invalid@example.com", "invalidPassword")
})

for (const user of loginData) {
test(`Verify ${user.email} can signOut successfully`, async ({page})=> {
    signIn = new SignInPage(page)
    await signIn.successfulSignOut(
        user.email,
        user.password
    )
})
}
        