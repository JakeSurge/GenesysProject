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

//tests the compare item feature on the site (this may have issues if items are already in the comparison list)
test("CanCompareItems", async ({ page }) => {
    //go to item
    await page.getByRole("link", { name: "Radiant Tee" }).first().click();

    //wait for URL
    await page.waitForURL("https://magento.softwaretestingboard.com/radiant-tee.html");

    //check for add to compare button
    const addToCompare = page.getByRole("link", { name: " Add to Compare" });

    //make sure add to compare has expected text
    await expect(addToCompare).toHaveText("Add to Compare");

    //add item to compare list
    await addToCompare.click();

    //go home
    await page.getByRole("link", { name: "Home" }).click();

    //wait for url
    await page.waitForURL("https://magento.softwaretestingboard.com/");

    //go to item
    await page.getByRole("link", { name: "Fusion Backpack" }).first().click();

    //wait for URL
    await page.waitForURL("https://magento.softwaretestingboard.com/fusion-backpack.html");

    //make sure add to compare has expected text
    await expect(addToCompare).toHaveText("Add to Compare");

    //add item to compare list
    await addToCompare.click();

    //go to comparison list
    await page.getByRole("link", { name: "comparison list" }).click();

    //wait for URL
    await page.waitForURL("https://magento.softwaretestingboard.com/catalog/product_compare/");

    //test that the correct information should be in the comparison list. Check for the title, description, and SKU
    //title
    await expect(page.getByText("Fusion Backpack", { exact: true })).toBeVisible();
    await expect(page.getByText("Radiant Tee", { exact: true })).toBeVisible();
    //description
    await expect(page.getByText("With the Fusion Backpack")).toBeVisible();
    await expect(page.getByText("So light and comfy, you'll")).toBeVisible();
    //SKU
    await expect(page.getByText("-MB02")).toBeVisible();
    await expect(page.getByText("WS12")).toBeVisible();

    //remove the closest item (fusion backpack)
    await page.getByRole("link", { name: " Remove Product" }).first().click();

    //make sure the confirmation is visible
    await expect(page.getByRole("button", { name: "OK" })).toBeVisible();

    //click the button
    await page.getByRole("button", { name: "OK" }).click();

    //test for exected information there and now not there
    //title
    await expect(page.getByText("Fusion Backpack", { exact: true })).not.toBeVisible();
    await expect(page.getByText("Radiant Tee", { exact: true })).toBeVisible();
    //description
    await expect(page.getByText("With the Fusion Backpack")).not.toBeVisible();
    await expect(page.getByText("So light and comfy, you'll")).toBeVisible();
    //SKU
    await expect(page.getByText("-MB02")).not.toBeVisible();
    await expect(page.getByText("WS12")).toBeVisible();

    //remove the other item
    await page.getByRole("link", { name: " Remove Product" }).first().click();

    //make sure the confirmation is visible
    await expect(page.getByRole("button", { name: "OK" })).toBeVisible();

    //click the button
    await page.getByRole("button", { name: "OK" }).click();

    //test for no items in comparison list pop up
    await expect(page.getByText("You have no items to compare.")).toBeVisible();
});
