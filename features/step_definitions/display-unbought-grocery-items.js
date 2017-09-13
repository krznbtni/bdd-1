let assert = require('assert');
let {
  defineSupportCode
} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({
  Given,
  When,
  Then
}) {

  // given = förberedelser
  // when = utför koden. nånting händer.
  // then = blev resultatet av When det vi förväntar oss ska hända

  Given('that I have a grocery list with unbought grocery items', function() {
    GroceryList.existingLists = [];
    this.list = new GroceryList('fruities');
    this.list.items = ['banana', 'apple', 'other'];
  });

  When('I click the display-unbought-grocery-items button', function() {
    this.list.displayUnboughtItems();
  });

  Then('only unbought grocery items should be shown', function() {
    // Front-end test
  });

  Given('that I have no unbought grocery items in my grocery list', function() {
    GroceryList.existingLists = [];
    this.list = new GroceryList('fruities');
    assert(this.list.items.length == 0, 'list is not empty');
    this.list.items = [];
  });

  When('I click the display-unbought-items button', function() {
    this.list.displayUnboughtItems();
  });

  Then('a message is shown stating that there are no unbought grocery items to display', function() {
    // Front-end test
  });

});
