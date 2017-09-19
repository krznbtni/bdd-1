let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');

defineSupportCode(function({Given, When, Then}) {

  let randomValidName = 'hello';

  Given('that I have a grocery list', function () {
    GroceryList.existingLists = [];
    this.list = new GroceryList('food');
  });

  When('I add an item with a name to the list', function () {
    this.list.addToList(randomValidName);
  });

  Then('that item should be added to the grocery list.', function () {
    assert(this.list.items.length == 1, 'the item was not added to the grocery-list');
    assert(this.list.items[0].name == randomValidName, 'the item added to the grocery-list has the wrong name');
  });


  Given('that I have a grocery list with at least {int} unbought item', function (int) {
    GroceryList.existingLists = [];
    this.int = int;
    assert(int >= 0, 'test-scenario has been changed and doesn\'t make sense anymore, please change it.')
    this.list = new GroceryList();

    for (let i = 0; i < int; ++i){
      this.list.addToList(randomValidName+i); // hello0, hello1, hello2 etc
    }

    assert(this.list.unboughtItems().length >= int, 'failed to add '+int+' items to the list.')
  });

  When('I add an item to the list that matches an unbought item in the list', function () {
    if(this.int < 1) { return; }

    let unbought = this.list.unboughtItems();
    let randomIndex = Math.floor(Math.random() * unbought.length);

    this.randomUnboughtItem = unbought[randomIndex];
    this.oldQuantity = this.randomUnboughtItem.quantity;
    this.randomishQuantity = 3;

    this.list.addToList(this.randomUnboughtItem.name, this.randomUnboughtItem.category, this.randomishQuantity);
  });

  Then('I should increment the quantity of that item in the grocery list.', function () {
    assert(this.randomUnboughtItem.quantity == this.oldQuantity + this.randomishQuantity,
      'the quantity of an unbought item did not increase properly');
  });
});
