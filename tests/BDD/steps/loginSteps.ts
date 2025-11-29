import { expect } from "@playwright/test";
import { Given, When, Then } from "@cucumber/cucumber";
import { page } from "../browserSetups";

/**
 * Implement the Login Page form using BDD, which helps separate page interactions from test logic.
 * 1. Test Steps: The steps include importing necessary modules, creating a loginPage object, visiting the URL, filling in email and password fields, and clicking the sign-in button.
 * 2. Test Execution: The test is run in UI mode to verify that the URL contains the expected values, confirming the test's success.
 * 3. Benefits: Using BDD makes the test easier to maintain and scale, as it separates page interactions from the test logic.
 */

Given("the user is on the login page", async () => {
  await page.goto("https://binaryville.com/account/");
});

When("the user enters a valid email and password", async () => {
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("john.doe@example.com");
  await page.getByRole("textbox", { name: "Password" }).fill("password123");
});

Then("the user should see their email and password in the URL", async () => {
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/john.doe%40example.com/);
  await expect(page).toHaveURL(/password123/);
});
