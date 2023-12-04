// @ts-check
const { test, expect } = require("@playwright/test");

//Run the login test before
test.beforeEach("UserCanLogin", async ({ page }) => {
    //go to the page
    await page.goto("https://magento.softwaretestingboard.com/");

    //make sure sign in link is on screen
    await page.waitForSelector(".authorization-link");

    //go to the sign in page
    await page.getByRole("link", { name: "Sign In" }).click();

    //wait for the new page
    await page.waitForURL("https://magento.softwaretestingboard.com/customer/account/login/referer/**");

    //check for sign in button
    const signInButton = page.getByRole("button", { name: "Sign In" });

    //compare text of sign in button to expected text
    await expect(signInButton).toHaveText("Sign In");

    //wait for selector email
    await page.waitForSelector("#email");

    //type in email and password
    await page.locator("#email").fill("jakobsurge@gmail.com");
    await page.getByLabel("password").fill("$ecretP@$$word123");

    //click the sign in button
    await signInButton.click();

    //await for the new url
    await page.waitForURL("https://magento.softwaretestingboard.com/");

    //make sure welcome message exists
    await expect(page.getByRole("banner").getByText("Welcome, Jakob Surgeon!")).toBeVisible();
});

//tests clicking into an item page and viewing the images of it before exiting out
test("CanViewItemAndCancel", async ({ page }) => {
    //click to open an item on the page
    await page.getByRole("link", { name: "Radiant Tee" }).first().click();

    //wait for new page
    await page.waitForURL("https://magento.softwaretestingboard.com/radiant-tee.html");

    //check for correct item title
    await expect(page.locator(".base")).toHaveText("Radiant Tee");

    //wait for image element to view to load in
    await page.waitForSelector(".fotorama__img");

    //click on the image to view the item more closely
    await page.getByRole("img", { name: "Radiant Tee" }).first().click();

    //make sure image is in fullscreen mode now
    await expect(page.getByLabel("Exit fullscreen")).toBeVisible();

    //exit fullscreen
    await page.getByLabel("Exit fullscreen").click();

    //make sure fullscreen is exited
    await expect(page.getByLabel("Exit fullscreen")).not.toBeVisible();

    //got to home page
    await page.getByRole("link", { name: "Home" }).click();

    //wait for page
    await page.waitForURL("https://magento.softwaretestingboard.com/");

    //check home page 'Hot Sellers' element visibility to confirm you are on the main page
    await expect(page.getByRole("heading", { name: "Hot Sellers" })).toBeVisible();
});
