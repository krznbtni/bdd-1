let assert = require('assert');
let {defineSupportCode} = require('cucumber');
// let GroceryList = require('../../grocery-list.js');
let GroceryListItem = require('../../grocery-list-item.js');

defineSupportCode(function({Given, When, Then}) {

  let randomValidName = 'valid name';

  function getTestNames() { return [
    { n: undefined},
    { n: ''},
    { n: [34]},
    { n: true},
    { n: false}
  ]};

  function getTestCategories() { return [
    { n: 'name', c: 35},
    { n: 'name', c: {stuff: 'hello'}},
    { n: 'name', c: ['sta']},
    { n: 'name', c: true},
    { n: 'name', c: false},
    { n: 'name', c: null}
  ]};

  function getTestQuantities(int) {
    let r = [
      { n: 'name', q: int-1},
      { n: 'name', q: -int},
      { n: 'name', q: ''},
      { n: 'name', q: 'thirty-five'},
      { n: 'name', q: [3]}
    ];
    if (int > 0) { r.push({ n: 'name', q: 0}); }
    return r;
  };


  // ----         Creating a grocery list item         ----

  Given('that I have not entered a valid name for a new item', function () {
    this.testData = getTestNames();
  });

  Given('that I have not entered a valid category for a new item', function () {
    this.testData = getTestCategories();
  });

  Given('that I have entered less than {int} as quantity for a new item', function (int) {
    this.testData = getTestQuantities(int);
  });


  When('I try to create an item with that info', function () {
    this.item = undefined;
    for (let data of this.testData) {
      if (this.item !== undefined) { return; }
      try {
        this.item = new GroceryListItem(data.n, data.c, data.q);
      } catch(e){};
    }
  });


  Then('no item should be created', function () {
    assert(this.item === undefined, 'an item was created with invalid arguments');
  });

  Then('I should be notified that a valid name is needed to be supplied', function () {
    // Frontend-test
  });

  Then('I should be notified that a valid category must be supplied', function () {
    // Frontend-test
  });

  Then('I should be notified that a quantity of {int} or more must be supplied', function (int) {
    // Frontend-test
  });


  // ----         Modifying a grocery list item         ----

  Given('that I have not entered a valid name for an existing item', function () {
    this.testData = getTestNames();
  });

  Given('that I have not entered a valid category for an existing item', function () {
    this.testData = getTestCategories();
  });

  Given('that I have entered a quantity of an existing item to be less than {int}', function (int) {
    this.testData = getTestQuantities(int);
  });


  When('I try to set the {string} of the item to that', function (string) {
    assert(string == 'name' || string == 'category' || string == 'quantity',
      'scenario has been changed, update the test-code!');

    this.item = new GroceryListItem(randomValidName);

    for (let data of this.testData) {
      let firstLetter = string[0]; // ex: quantity = q
      try {
        this.item[string] = data[firstLetter]; // ex: this.item.name = data.n
      } catch(e) {};
    }
  });


  Then('nothing should happen to the item', function () {
    let newItem = new GroceryListItem(randomValidName);
    assert.deepStrictEqual(newItem, this.item, 'the item was changed!');
  });
});
