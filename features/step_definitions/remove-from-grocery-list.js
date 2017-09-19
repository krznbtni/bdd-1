let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given, When, Then}) {

  let groceryList;

  Given('that I have a grocery list with at least one item', function () {
    GroceryList.existingLists = [];
    groceryList = new GroceryList('food');

    groceryList.addToList('Tuna');
    groceryList.addToList('Chicken');
    groceryList.addToList('Pork');
  });

  When('I try to remove an item from the grocery list', function () {});

  When('that item is in the grocery list', function () {
    groceryList.removeFromList('Tuna');
  });

  When('that item is not in the grocery list', function () {
    groceryList.removeFromList('randomItemName');
  });

  Then('that item should be removed from the grocery list.', function () {

    let itemWasFound = groceryList.items.find(item=>{
      return item.name == 'Tuna';
    });


    assert(!itemWasFound, 'Tuna was not removed');
  });

  Then('no item should be removed from the grocery list', function () {

    let itemWasFound = groceryList.items.find(item=>{
      return item.name == 'randomItemName';
    });

    assert(!itemWasFound, 'No items were removed');
  });

});
