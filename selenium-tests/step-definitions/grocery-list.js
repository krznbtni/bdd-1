const GroceryList = require('../../grocery-list');

module.exports = function() {

  let listName = "minLista"

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
    await inputField.sendKeys(listName);
  });

  this.Given(/^that I do not fill in a valid name for a new grocery list$/, async function() {
    // Navigate to the app in the browser
    await helpers.loadPage('http://localhost:3000');

    // Click addList btn
    let addListBtn = await driver.findElement(by.css('#add-list'));
    await addListBtn.click();

    // Find the input field for list name
    let inputField = await driver.findElement(by.css('#listName'));
    await sleep(500);

    // invalid list name
    let listName = ""
    await inputField.sendKeys(listName);
  });

  this.Given(/^that I fill in a valid name for a new grocery list that has already been used$/, async function() {
    // Navigate to the app in the browser
    await helpers.loadPage('http://localhost:3000');

    // Create a list that we will duplicate later
    new GroceryList('minLista');

    // Click addList btn
    let addListBtn = await driver.findElement(by.css('#add-list'));
    await addListBtn.click();

    // Find the input field for list name
    let inputField = await driver.findElement(by.css('#listName'));
    await sleep(500);

    // duplicate list name
    let listName = "minLista"
    await inputField.sendKeys(listName);
  });

  this.When(/^I click the create button$/, async function() {
    // Click the button create list
    let btn = await driver.findElement(by.css('#addListButton'));
    await btn.click();
  });

  this.Then(/^a grocery list should be created$/, async function() {
    let element = await driver.findElement(by.css('li#' + listName));
    expect(element).to.exist;
  });

  this.Then(/^a grocery list should not be created$/, async function() {
    let element = await driver.findElements(By.css('li#' + listName)) < 1 ? false : true

    if (element == true) {
      // search for listName in GroceryList.existingLists
      for (let key in GroceryList.existingLists) {
        if (key === listName) {
          element = false;
        }
      }
    }
    expect(element).to.equal(false);
  });

  this.Then(/^an error message should be shown stating that I must fill in a name for the list$/, async function() {

  });

  this.Then(/^an error message should be shown stating that I have already used the name before$/, async function() {
    
  });

}
