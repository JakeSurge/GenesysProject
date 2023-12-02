const { test, expect } = require("@playwright/test");

test("WikiPediaPagehasHelloWorldTitle", async ({ page }) => {
    await page.goto("https://en.wikipedia.org/wiki/%22Hello,_World!%22_program");
    //create a locator
    let header = page.locator(".mw-page-title-main");
    //Expect header to have correct text
    await expect(header).toHaveText('"Hello, World!" program');
});
