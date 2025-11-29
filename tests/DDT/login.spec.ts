import test, { expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/login-page.pom";
import loginData from "./data/loginData.json";

loginData.forEach(({ email, password }) => {
  test(`User can login with valid credentials ${email} *DDT`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goTo();
    await loginPage.login(email, password);

    await expect(page).toHaveURL(new RegExp(encodeURIComponent(password)));
  });
});
