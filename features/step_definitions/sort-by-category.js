let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given,When,Then}) {

  // given = förberedelser
  // when = utför koden. nånting händer.
  // then = blev resultatet av When det vi förväntar oss ska hända

  // Scenario: Sort grocery-list by ascending category
  Given('that there is an existing grocery-list', function() {
    GroceryList.existingLists = [];
    this.list = new GroceryList('fruities');
  });

  Given('that grocery-list has more then zero items', function() {
    this.list.addToList('orange');
    this.list.addToList('banana');
    this.list.addToList('paer');
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
        if (arr[i] >= arr[i + 1]) {
          return false;
        }
      }
    }
  });

  When('I click the sorting button for category', function() {
    this.list.sortByCategory();
  });

  Then('the list should be sorted by ascending category.', function() {
    let ascList = this.list.items.slice().sort((a, b) => {
      return a.category < b.category;
    });

    assert.deepEqual(this.list.items, ascList, 'Items not sorted ascending!');
  });

  // Scenario: Sort grocery-list by descending category
  Given('it\'s sorted by ascending category', function() {
    if (!isSorted(this.list.items)) {
      this.list.sortByCategory();
    }

    function isSorted(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= arr[i + 1]) {
          return false;
        }
      }
    }
  });

  Then('the list should be sorted by descending category.', function() {
    assert.deepEqual(this.list.items, this.list.items.slice().sort((a, b) => {
      return a.category > b.category
    }), 'Items not sorted descending!');
  });

  // Scenario: Sort an empty grocery-list
  Given('that grocery-list has zero items', function() {
    this.list.items = [];
  });

  Then('nothing should happen.', function () {
    assert.doesNotThrow(() => {
      this.list.sortByCategory()
    }, 'nothing to see!');
  });
});
