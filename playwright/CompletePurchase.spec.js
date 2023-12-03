// @ts-check
const { test, expect } = require("@playwright/test");

//Run the login test before the add item to cart test
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

//tests completing a purchase after adding it to the cart
test("CanCompletePurchase", async ({ page }) => {
    //click to open an item on the page
    await page.getByRole("link", { name: "Hero Hoodie" }).first().click();

    //wait for new page
    await page.waitForURL("https://magento.softwaretestingboard.com/hero-hoodie.html");

    //check for correct item title
    await expect(page.locator(".base")).toHaveText("Hero Hoodie");

    //wait for size button to load
    await page.waitForSelector("#option-label-size-143-item-168");

    //select size and color
    await page.getByLabel("M", { exact: true }).click();
    await page.getByLabel("Green").click();

    //add to cart
    await page.getByRole("button", { name: "Add to Cart" }).click();

    //open the cart menu
    await page.getByRole("link", { name: " My Cart 1 1\nitems" }).click();

    //click the proceed to cart button
    await page.getByRole("button", { name: "Proceed to Checkout" }).click();

    await page.getByRole("button", { name: "+New Address" }).click();
    await page.getByLabel("Street Address: Line 1").fill("1100 E 5th St");
    await page.getByLabel("City").fill("Anderson");
    await page.locator('select[name="region_id"]').selectOption("24");
    await page.getByLabel("Zip/Postal Code").fill("46012");
    await page.getByLabel("Phone Number").fill("5133843088");
    await page.getByLabel("Save in address book").uncheck();
    await page.getByRole("button", { name: "Ship here" }).click();
    await page.getByLabel("Table Rate").check();
    await page.getByRole("button", { name: "Next" }).click();
    await page.getByLabel("My billing and shipping").check();
    await page.getByRole("button", { name: "Place Order" }).click();
    //await page.getByRole('link', { name: '000036394' }).click();
});
