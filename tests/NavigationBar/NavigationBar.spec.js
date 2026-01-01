import {test} from "@playwright/test"
import { NavigationBar } from "../../page-objects/Components/NavigationBar"

let navBar

test.beforeEach(async({page}) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/")  
})
test("Verify website Logo should be visible", async({page}) => {
    navBar = new NavigationBar(page)
    await navBar.websiteLogo()

})

test("Verify Home link in the navbar is visible and navigates to the Home page", async({page}) => {
    navBar = new NavigationBar(page)
    await navBar.navigateToHome()    

})

test("Verify Shop link in the navbar is visible and navigates to the Shop page", async({page}) => {
    navBar = new NavigationBar(page)
    await navBar.navigateToShop()    

})

test("Verify Contact link in the navbar is visible and navigates to the Contact page", async({page}) => {
    navBar = new NavigationBar(page)
    await navBar.navigateToContact()    

})

test("Verifying the Login link in the navbar is visible and navigates to the Login page", async ({page}) => {
    navBar = new NavigationBar(page)
    await navBar.navigateToLogin()
})

test("Verifying the Sign Up link in the navbar is visible and navigates to the Sign Up page", async ({page}) => {
    navBar = new NavigationBar(page)
    await navBar.navigateToSignUp()
})


test("Verifying the Footer message is present and visible for users", async ({page}) => {
    navBar = new NavigationBar(page)
    await navBar.verifyDesclaimerMessageIsVisible()
})