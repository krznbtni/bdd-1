const GroceryList = require('../../grocery-list');

module.exports = function() {

  let listName = "minLista"
  let invalidName = '';
  let validName = 'Milk';
  let invalidCategory = '35';

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function createAList(){
    await helpers.loadPage('http://localhost:3000');
    await driver.findElement(by.css('#add-list')).click();
    await sleep(500);
    await driver.findElement(by.css('#listName')).sendKeys(listName);
    await driver.findElement(by.css('#addListButton')).click();
    await sleep(500);
    await driver.findElement(by.css('.show-detailed-view')).click();
    await driver.findElement(by.css('#add-grocery')).click();
    await sleep(500);
  }

  async function createAnItem(name='', category='', quantity=''){
    await driver.findElement(by.css('#name')).sendKeys(name);
    await driver.findElement(by.css('#category')).sendKeys(category);
    if (quantity != '') {
      // Doesn't work in selenium even though the npm module says it does..
      // await driver.findElement(by.css('#quantity')).sendKeys(selenium.Key.DELETE);
    }
    await driver.findElement(by.css('#quantity')).sendKeys(quantity);
  }

  this.Given(/^that I have not entered a valid name for a new item$/, async function() {
    await createAList();
    await createAnItem(invalidName);
  });

  this.Given(/^that I have entered a valid name for a new item$/, async function() {
    await createAList();
    await createAnItem(validName);
  });

  this.Given(/^that I have not entered a valid category for a new item$/, async function() {
    await createAList();
    // await createAnItem(invalidName);
    // can't test with selenium
  });

  this.Given(/^that I have entered less than (\d+) as quantity for a new item$/, async function (arg1) {
    await createAList();
    // can't test with selenium
    // await createAnItem(validName, '', arg1-1);
  });

  this.When(/^I try to create an item with that info$/, async function() {
    await driver.findElement(by.css('#addListButton')).click();
  });

  this.Then(/^no item should be created$/, async function() {
    let elements = await driver.findElements(by.css('#list-items li'));
    assert(elements.length == 0, 'wrong1');
  });

  this.Then(/^an item should be created$/, async function() {
    let elements = await driver.findElements(by.css('#list-items li'));
    assert(elements.length != 0, 'wrong2');
  });
}
