import { Browser, chromium, Page } from "@playwright/test";
import { Before, After } from "@cucumber/cucumber";

let page: Page;
let browser: Browser;

Before(async () => {
    const isCI = process.env.CI === "true";
    browser = await chromium.launch({
        headless: isCI ? true : false,
        args: [
            // "--disable-gpu",
            "--disable-dev-shm-usage",
            // "--no-sandbox",
            // "--disable-features=VizDisplayCompositor"
        ]
    });

    const context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await browser.close();
});

export { page };