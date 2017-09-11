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

  // Scenario: Sort grocery-list by ascending category
  Given('that there is an existing grocery-list', function() {
    this.list = new GroceryList('lista');
  });

  Given('that grocery-list has more then zero items', function() {
    this.list.addToList('banan');
    this.list.addToList('apelsin');
    this.list.addToList('gurka');
  });

  Given('it\'s not already sorted by ascending category', function() {
    let items = this.list.items;

    if (isSorted(items) && items.length > 1) {
      let tmp = items[0];
      items[0] = items[1];
      items[1] = tmp;
    }

    function isSorted(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          return true
        } else {
          return false
        }
      }
    }
  });

  When('I click the sorting link/button for category', function() {
    this.sortByCategory();
  });

  Then('the list should be sorted by ascending category', function() {
    assert.deepEqual(this.list.items, this.list.items.sort(), 'Items not sorted!');
  });

});
