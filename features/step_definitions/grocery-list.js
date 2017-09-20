let assert = require('assert');
let {defineSupportCode} = require('cucumber');
let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given, When, Then}) {

  let usedListNames = [
    "list-name-1",
    "list-name-2",
    "list-name-3",
    "list-name-4",
  ];

  let newList;

  Given('that I fill in a valid name for a new grocery list', function () {
    this.name = 'aaa';
  });

  Given('that I do not fill in a valid name for a new grocery list', function () {
    this.name = '';
  });

  Given('that I fill in a valid name for a new grocery list that has already been used', function () {
    //include tittar ifall den finns i listan. default är true.
    this.name = 'list-name-1';
    assert(usedListNames.includes(this.name), 'this name is already used');
  });

  When('I click the create button', function () {
    GroceryList.existingLists = {};
    this.newList = new GroceryList(this.name);
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
