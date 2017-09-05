// Import the built in assert module
let assert = require('assert');

// Import the GroceryList class
let GroceryList = require('./grocery-list');

// Collect all tests I want to do with
// the GroceryList class in a new class
module.exports = class GroceryListTest {

  constructor(){
    this.constructorTest();
    this.addToList();
    this.buy();
    this.boughtItems();
    this.unboughtItems();
  }

  constructorTest(){
  }

  addToList(){
  }

  buy(){
  }

  boughtItems(){
  }

  unboughtItems(){
  }

}