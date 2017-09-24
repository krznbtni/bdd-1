const GroceryList = require('../../grocery-list');

module.exports = function() {

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  this.Given(/^that I fill in a valid name for a new grocery list$/, async function() {
    // Navigate to the app in the browser
    await helpers.loadPage('http://localhost:3000');

    // Click addList btn
    let addListBtn = await driver.findElement(by.css('#add-list'));
    await addListBtn.click();

    // Find the input field for list name
    let inputField = await driver.findElement(by.css('#listName'));
    await sleep(500);

    // Fill in some text (the name of a list)
    let listName = "Grönsaker"
    await inputField.sendKeys(listName);
  });

  this.When(/^I click the create button$/, async function() {
    // Click the button create list
    let btn = await driver.findElement(by.css('#addListButton'));
    await btn.click();
  });

  this.Then(/^a grocery list should be created$/, async function() {
    
  });
}
