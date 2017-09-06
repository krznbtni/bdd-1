let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');

defineSupportCode(function({Given, When, Then}) {

  Given('that I have a grocery list with bought grocery items', function () {
    this.list = new GroceryList();
    this.list.addToList('pear');
    this.list.addToList('apple');
    this.list.addToList('orange');
    this.list.buy('apple');
    this.list.buy('orange');
    this.list.addToList('pineapple');

    assert(this.list.boughtItems().length == 0, 'failed to create a list with some bought items.');
  });

  When('I click the display-bought-grocery-items button', function () {
    this.boughtItems = this.list.boughtItems();
  });

  Then('only bought grocery items should be shown', function () {
    let unbought = [];
    let bought = [];

    this.list.items.forEach((item)=>{
      if (item.bought){
        bought.push(item);
      } else {
        unbought.push(item);
      }
    });

    assert(bought.length == this.boughtItems.length);
    assert(unbought.length == this.list.items.length - this.boughtItems.length);

    assert(boughtItems.indexOf(this.boughtItems[0]) != -1);
    assert(boughtItems.indexOf(this.boughtItems[1]) != -1);

    assert(this.boughtItems.find(i=>i.name == 'apple'));
    assert(this.boughtItems.find(i=>i.name == 'orange'));

  });


  Given('that I have not bought any grocery items yet', function (callback) {
    this.list = new GroceryList();
    this.list.addToList('pear');
    this.list.addToList('apple');
    this.list.addToList('orange');
    this.list.addToList('pineapple');

    assert(this.list.boughtItems().length !== 0, 'failed to create a list with no bought items.');
  });

  // When 'I click the display-bought-grocery-items button'

  Then('a message is shown stating that there are no bought grocery items to display', function (callback) {
    // Frontend-test
  });
});
