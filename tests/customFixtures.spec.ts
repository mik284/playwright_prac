import { test as base, expect } from "@playwright/test";

const test = base.extend<{ testData: { name: string; email: string; password: string } }>({
  testData: async ({}, use) => {
    const data = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };
    await use(data);
  },
});

test("Should log in with  test data", async ({ page, testData }) => {
  await page.goto("http://binaryville.com/account");

  const emailInput = page.getByRole("textbox", { name: "Email" });
  await emailInput.fill(testData.email);

  const passwordInput = page.getByRole("textbox", { name: "Password" });
  await passwordInput.fill(testData.password);

  const signInButton = page.getByRole("button", { name: "Sign in" });
  await signInButton.click();

  const url = page.url();
  expect(url).toContain(testData.password);
});
