import { Locator, Page } from "@playwright/test";

/**
 * 1. Identify Key Elements: The key elements on the login page include email, password, and sign-in button.
 * 2. Create Locators: Use Playwright's Locator and Page to create locators for these elements.
 * 3. Initialize Locators: Initialize these locators in a class constructor, making them public for easy access in future tests.
 * 4. Separate Structure from Logic: The page object model separates the structure of the test from the test logic, making tests more maintainable and flexible.
 */

export class LoginPage {
  public readonly page: Page;
  public readonly emailLocator: Locator;
  public readonly passwordLocator: Locator;
  public readonly signInButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLocator = page.getByRole("textbox", { name: "Email" });
    this.passwordLocator = page.getByRole("textbox", { name: "Password" });
    this.signInButtonLocator = page.getByRole("button", { name: "Sign in" });
  }

  // Implement the goTo reusable method
  async goTo() {
    await this.page.goto("https://binaryville.com/account/");
  }

  //   Implement the login reusable method
  async login(email: string, password: string) {
    await this.emailLocator.fill(email);
    await this.passwordLocator.fill(password);
    
    await this.signInButtonLocator.click();
  }

}
