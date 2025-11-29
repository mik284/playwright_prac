import { Browser, chromium, expect, Page } from "@playwright/test";
import { Before, After, Given, When, Then } from "@cucumber/cucumber";



let page: Page;
let browser: Browser;

Before(async () => {
    browser = await chromium.launch({headless: false});

    const context = await browser.newContext();
    page = await context.newPage();
    
});

After(async () => {
    await browser.close();
});


Given("the user is on the login page", async () => {
    await page.goto("https://binaryville.com/account/");
});

When("the user enters a valid email and password", async () => {
    await page.getByRole("textbox", {name: "Email"}).fill("john.doe@example.com");
    await page.getByRole("textbox", {name: "Password"}).fill("password123");
});

Then("the user should see their email and password in the URL", async () => {
    await page.getByRole("button", {name: "Sign In"}).click();
    await expect(page).toHaveURL(/john.doe%40example.com/);
    await expect(page).toHaveURL(/password123/);
});

    