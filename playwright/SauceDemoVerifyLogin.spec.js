"use strict";
// @ts-check
const { test, expect } = require("@playwright/test");

test("StandardUserCanLogInto", async ({ page }) => {
    /**
    *In Chrome, right click on an element to inspect:
    *
    * You will interact with items by the ID, class, or other elements.
    *
    * to find an element by ID, you'll use the character:#
    * to find an element by the class, you use the character:.
    * to find by another attribute, (example, data-test), you'll put the full field name = the value you're
    looking for in brackets
    * ex:[data-test='some-value']
    *
    * javascript variable declarations:
    * -var- it's "unscoped" meaning that it's not very safe to use
    * -let- it's a "block" scope, meaning that it's safe with in the context of your code. Use this when
    you have a variable that you might need to change
    * -const- block scope declaration that you cannot reassign after initial assignment
    *
    */

    await page.goto("https://saucedemo.com");

    //verifying that we found the logo (we're on the right page)
    const logInButton = page.locator("#login-button");

    //Compare the text of selected element to expected text
    await expect(logInButton).toHaveText("Login");

    //verify that the first element you're interacting with is on the screen
    await page.waitForSelector("#user-name");

    //type in username & password
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");

    //clicktheloginbutton
    await logInButton.click();

    //verifying new page has been reached
    //todo:enter your code here

});
