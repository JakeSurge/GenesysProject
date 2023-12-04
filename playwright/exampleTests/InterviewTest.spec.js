// @ts-check
const { test, expect } = require("@playwright/test");

test("Click Test", async ({ page }) => {
    //go to initial page
    await page.goto("https://playwright.dev/docs/writing-tests");

    //set locator for link on page
    let click = page.getByRole("link", { name: "locator.click()" });

    //click the link
    await click.click();

    //test for url change
    await expect(page.url()).toEqual("https://playwright.dev/docs/api/class-locator#locator-click");
});
