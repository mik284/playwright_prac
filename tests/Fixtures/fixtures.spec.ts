import test, { chromium, expect } from "@playwright/test";

// custom fixture
test("Sign In button is visible", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://binaryville.com/account");
  const signInButton = page.getByRole("button", { name: "Sign in" });

  await expect(signInButton).toBeVisible();

  await browser.close();
});

// builtin fixtures
test("Sign In button is visible *using built in fixture", async ({ page }) => {
  await page.goto("https://binaryville.com/account");
  const signInButton = page.getByRole("button", { name: "Sign in" });

  await expect(signInButton).toBeVisible();
});
