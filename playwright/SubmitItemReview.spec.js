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

//tests submitting a review and confirms it was sent
test("CanSubmitReview", async ({ page }) => {
    //go to item
    await page.getByRole("link", { name: "Breathe-Easy Tank" }).first().click();

    //wait for URL
    await page.waitForURL("https://magento.softwaretestingboard.com/breathe-easy-tank.html");

    //click review tile
    await page.getByRole("link", { name: "Reviews (2) " }).click();

    //check submit review button
    await expect(page.getByRole("button", { name: "Submit Review" })).toBeVisible();

    //fill in review information
    //had to use 2 stars because other ratings did not work?
    await page.getByTitle("2 stars").click();
    await page.getByLabel("Summary").fill("Very Good Product");
    await page
        .getByLabel("Review", { exact: true })
        .fill("This shirt is very good for the price. The material is very high quality.");

    //submit the review
    await page.getByRole("button", { name: "Submit Review" }).click();

    //check for popup that the review was submitted
    await expect(page.getByText("You submitted your review for")).toBeVisible();
});
