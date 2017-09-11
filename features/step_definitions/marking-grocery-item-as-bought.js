let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given, When, Then}) {

  let boughtItems = [];
  let selectedItems = [];
  let groceryList;

  Given('that I have already created a grocery list with atleast one grocery item', function () {
    groceryList = new GroceryList();

    groceryList.addToList('bubblegum');
  });

  Given('I have selected atleast one grocery item', function () {
    // skapa en array med strängar och sen antar vi att dom är selected
    selectedItems.push("bubblegum");
  });

  Given('I have not selected a grocery item', function () {
    selectedItems = [];
  });

  When('I click the bought button', function () {
    // assuming that "clicking the bought button" will trigger a call to buy(itemName)
    for(let itemName of selectedItems){
       groceryList.buy(itemName);
       boughtItems.push(itemName);
    }
  });

  Then('the grocery items should be marked as bought', function(){
    // test that we have the bought items in the GroceryList's items array and that they have the
    // property bought
    for(let itemName of boughtItems){
      let foundItem;
      for(let item of groceryList.items){
        if(item.name === itemName){
          foundItem = item;
        }
      }
      assert(foundItem); // will fail if we didn't find the item
      assert(foundItem.bought) // will fail it the item isn't marked as bought
    }
  });

  Then('no grocery items should be marked as bought', function () {
    // frontend test
  });



});
