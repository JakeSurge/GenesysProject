const { test, expect } = require("@playwright/test");
test("WikiPediaPagehasHelloWorldTitle", async ({ page }) => {
    await page.goto("https://en.wikipedia.org/wiki/%22Hello,_World!%22_program");
    //createalocator
    let header = page.locator(".mw-page-title-main");
    //Expectheadertohavecorrecttext
    (await expect(header).textContent) == '"Hello,World!"program';
});
