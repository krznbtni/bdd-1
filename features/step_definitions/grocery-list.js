let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given, When, Then}) {

  Given('that I fill in a valid name for a new grocery list', function () {
    GroceryList.existingLists = {};
    this.name = 'aaa';
  });

  Given('that I do not fill in a valid name for a new grocery list', function () {
    GroceryList.existingLists = {};
    this.name = '';
  });

  Given('that I fill in a valid name for a new grocery list that has already been used', function () {
    GroceryList.existingLists = {};
    this.name = 'list-name-1';
    new GroceryList(this.name);
    try {
      this.newList = new GroceryList(this.name);
    } catch(e){};
  });

  When('I click the create button', function () {
    try {
      this.newList = new GroceryList(this.name);
    } catch(e){};
  });

  Then('a grocery list should be created', function () {
    GroceryList.existingLists = {};
    assert(this.newList !== undefined);

    assert(this.newList.constructor.name);

    //deep kollar alla variabler innanför objektet. alla variabler.
    //strict kollar ifall det är samma variabeltyp också
    assert.deepStrictEqual(this.newList, new GroceryList(this.name), '... successfully created the grocery list!');
  });

  Then('a grocery list should not be created', function () {
    assert(this.newList === undefined);
  });

  Then('an error message should be shown stating that I must fill in a name for the list', function () {
    // Frontend-test
  });

  Then('an error message should be shown stating that I have already used the name before', function () {
    // Frontend-test
  });
});
