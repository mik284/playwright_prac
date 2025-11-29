import { test, expect } from "../../page-objects/fixtures";

/**
 * Implement the Login Page form using POM, which helps separate page interactions from test logic.
 * 1. Test Steps: The steps include importing necessary modules, creating a loginPage object, visiting the URL, filling in email and password fields, and clicking the sign-in button.
 * 2. Test Execution: The test is run in UI mode to verify that the URL contains the expected values, confirming the test's success.
 * 3. Benefits: Using POM makes the test easier to maintain and scale, as it separates page interactions from the test logic.
 */


/*
 * Best Practices
 * 1. Keep POMs focused:
 *        Avoid mixing business logic with your POM; it should only handle UI interactions.
 * 2. Simplicity: 
 *        Keep the POM simple and avoid adding complex logic. Complex logic should be in the test cases.
 * 3. Single Responsibility: 
 *        Each POM should represent a single page or component to maintain clarity and manageability.
 * 4. Avoid Hardcoding: 
 *        Use parameters, constants, or configuration files instead of hardcoding values like URLs or credentials.
 * 5. Regular Maintenance: 
 *        Regularly review and update your POMs to align with the current state of your UI.
 * 6. Flexibility: 
 *        Build POM components that can be extended or composed into larger POMs for flexibility and reusability.
 * 7. Public Locators: 
 *        Ensure locators in your POM are public to enhance test maintainability and flexibility.
 * 8. Avoid Sugar Methods: 
 *        Avoid creating methods that oversimplify actions, making it unclear what the test is actually doing.
 * 9. Focus Responsibility: 
 *        Each POM should represent a single page or component to maintain clarity and manageability.
 * 10. Avoid Tying POMs to URLs: 
 *        A good POM focuses on the structure and behavior of the page, not on specific URLs.
 * 
 */

test("Should login using POM", async ({ page, loginPage }) => {
  await page.goto("http://binaryville.com/account");

  await loginPage.login("john.doe@example.com", "password123");

  expect(page.url()).toContain("password123");
});
