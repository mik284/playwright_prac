import { test as base, expect } from "@playwright/test";

import { LoginPage } from "./login-page.pom";
/*
 * Extend the base test with a custom fixture to optimize test execution
 * 
 * This fixture creates a new LoginPage instance for each test and provides it to the test
 * 
 * The fixture is then used in the test file to create a new LoginPage instance for each test
 * 
 */

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect };
