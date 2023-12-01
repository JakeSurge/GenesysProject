const { test, expect } = require("@playwright/test");
test("WikiPediaPagehasHelloWorldTitle", async ({ page }) => {
    await page.goto("https://en.wikipedia.org/wiki/%22Hello,_World!%22_program");
    //createalocator
    let header = page.locator(".mw-page-title-main").textContent;
    //Expectheadertohavecorrecttext
    expect(header == '"Hello,World!"program');
});
