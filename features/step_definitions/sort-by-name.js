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

  // Scenario: Sort grocery-list by ascending name

  Given('it\'s not already sorted by ascending name', function() {
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

  When('I click the sorting button for name', function() {
    this.list.sortByName();
  });


  Then('the list should be sorted by ascending name', function() {
    let ascList = this.list.items.slice().sort((a, b) => {
      return a.name < b.name;
    });

    assert.deepEqual(this.list.items, ascList, 'Items not sorted ascending!');
  });


  Given('it\'s sorted by ascending name', function() {
    if (!isSorted(this.list.items)) {
      this.list.sortByName();
    }

    function isSorted(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= arr[i + 1]) {
          return false;
        }
      }
    }
  });

  Then('the list should be sorted by decending name', function() {
    assert.deepEqual(this.list.items, this.list.items.slice().sort((a, b) => {
      return a.name > b.name
    }), 'Items not sorted descending!');
  });

  Then('nothing should happen', function() {
    assert.doesNotThrow(() => {
      this.list.sortByName()
    }, 'nothing to see');
  });

});
