// @ts-check
const { test, expect } = require("@playwright/test");

//Run the login test before
//In order to avoid conflicts while running multiple tests at once this test uses a different account than the rest
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
    await page.locator("#email").fill("jrsurgeon@anderson.edu");
    await page.getByLabel("password").fill("$ecretP@$$word123");

    //click the sign in button
    await signInButton.click();

    //await for the new url
    await page.waitForURL("https://magento.softwaretestingboard.com/");

    //make sure welcome message exists
    await expect(page.getByRole("banner").getByText("Welcome, Jake Surgeon!")).toBeVisible();
});

//tests completing a purchase after adding it to the cart
test("CanCompletePurchase", async ({ page }) => {
    //click to open an item on the page
    await page.getByRole("link", { name: "Argus All-Weather Tank" }).first().click();

    //wait for new page
    await page.waitForURL("https://magento.softwaretestingboard.com/argus-all-weather-tank.html");

    //wait for size button to load
    await page.waitForSelector("#option-label-size-143-item-168");

    //select size and color
    await page.getByLabel("M", { exact: true }).click();
    await page.getByLabel("Gray").click();

    //add to cart
    await page.getByRole("button", { name: "Add to Cart" }).click();

    //check for the current item count
    //let itemCount = page.locator(".count").innerText();

    //open the cart menu
    await page.getByRole("link", { name: " My Cart 1 1\nitems" }).click();

    //click the proceed to cart button
    await page.getByRole("button", { name: "Proceed to Checkout" }).click();

    //check label to make sure it is the right page
    await expect(page.getByText("Shipping Methods")).toBeVisible();

    //click the new address button
    await page.getByRole("button", { name: "+New Address" }).click();

    //make sure it brought up address input
    await expect(page.getByRole("heading", { name: "Shipping Address" })).toBeVisible();

    //make sure the address inputs are visible
    await expect(page.getByLabel("Street Address: Line 1")).toBeVisible();

    //fill in information for address and phone number
    await page.getByLabel("Street Address: Line 1").fill("1100 E 5th St");
    await page.getByLabel("City").fill("Anderson");
    await page.locator('select[name="region_id"]').selectOption("24");
    await page.getByLabel("Zip/Postal Code").fill("46012");
    await page.getByLabel("Phone Number").fill("5133843088");

    //uncheck the save in address book button
    await page.getByLabel("Save in address book").uncheck();

    //click ship here to proceed
    await page.getByRole("button", { name: "Ship here", exact: true }).click();

    //make sure the address inputs are gone
    await expect(page.getByRole("heading", { name: "Shipping Address" })).not.toBeVisible();

    //select the shipping rate
    await page.getByLabel("Table Rate").check();

    //click next to proceed
    await page.getByRole("button", { name: "Next" }).click();

    //check for place order button
    const placeOrder = page.getByRole("button", { name: "Place Order" });

    //make sure the place order button is visible
    await expect(placeOrder).toBeVisible();

    //select your shipping option
    await page.getByLabel("My billing and shipping").check();

    //click the place order button
    await placeOrder.click();

    //wait for the url
    await page.waitForURL("https://magento.softwaretestingboard.com/checkout/onepage/success/**");

    //double check it is the right page
    await expect(page.locator(".base")).toHaveText("Thank you for your purchase!");

    //wait for selector to load in
    await page.waitForSelector(".order-number");

    //find the order link to verify the order
    await page.locator(".order-number").click();

    //wait for new url
    await page.waitForURL("https://magento.softwaretestingboard.com/sales/order/view/order_id/**");

    //find the code of the order with the url
    //it is always 1 more than the url code
    const orderCode = parseInt(page.url().slice(67, 72)) + 1;

    //wait for selector to load in
    await page.waitForSelector(".base");

    //compare the title text to the expected text verifying the order
    await expect(page.locator(".base")).toHaveText("Order # 0000" + orderCode.toString());
});
