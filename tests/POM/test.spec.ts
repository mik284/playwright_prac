import { test, expect } from "../../page-objects/fixtures";

/**
 * Implement the Login Page form using POM, which helps separate page interactions from test logic.
 * 1. Test Steps: The steps include importing necessary modules, creating a loginPage object, visiting the URL, filling in email and password fields, and clicking the sign-in button.
 * 2. Test Execution: The test is run in UI mode to verify that the URL contains the expected values, confirming the test's success.
 * 3. Benefits: Using POM makes the test easier to maintain and scale, as it separates page interactions from the test logic.
 */

test("Should login using POM", async ({ page, loginPage }) => {
  await page.goto("http://binaryville.com/account");

  await loginPage.login("john.doe@example.com", "password123");

  expect(page.url()).toContain("password123");
});
