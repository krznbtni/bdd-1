module.exports = function () {

  this.Given(/^that I fill in a valid name for a new grocery list$/, async function () {
    // Navigate to the app in the browser
    await helpers.loadPage('http://localhost:3000');

    // Find the input field for list name
    let inputField = await driver.findElement(by.css('#listName'));

    // Fill in some text (the name of a list)
    let listName = "Grönsaker"
    await inputField.sendKeys(listName);

    // Click the button create list
    let btn = await driver.findElement(by.css('#addListButton'));
    await btn.click();
  });

  this.When(/^I click the create button$/, function () {

  });

  this.Then(/^a grocery list should be created$/, function () {

  });
}