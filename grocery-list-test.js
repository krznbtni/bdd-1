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
    assert.throws(
      ()=>new GroceryList(),
      Error, // Any error message is ok
      'Could create a GroceryList with no in-argument.'
    );

    assert.throws(
      ()=>new GroceryList(999),
      Error,
      'Could create a GroceryList with a non-string as in-argument.'
    );

    assert.throws(
      ()=>new GroceryList(''),
      Error,
      'Could create a GroceryList with an empty string as in-argument'
    );

    // TEST THAT THE PROPERTY items IS AN EMPTY ARRAY

    let myGroceryList = new GroceryList('Test');
    assert.deepStrictEqual(
      myGroceryList.items,
      [],
      'GroceryList created without the property items being an empty array'
    );
  }

  addToList(){
    let l = new GroceryList('addToList');

    // The test depends on an assumed length
    assert(l.items.length == 0);

    let names = ['one', 'anot h er item '];

    for(let i = 0; i < names.length; ++i){
      l.addToList(names[i]);
      assert(l.items.length == i+1);
      assert(l.items[i].name === names[i]);
    }

    for(let i = 0; i < names.length; ++i){
      assert(l.items[i].name === names[i]);
    }
  }

  buy(){
    let l = new GroceryList('addToList');
    let names = ['one', 'anot h er item ', 'yet anythr item', 'something', 'yeah'];

    for(let i = 0; i < names.length; ++i){
      l.addToList(names[i]);
    }

    let namesLeftToTest = names.slice();
    for(let i = namesLeftToTest.length-1; i >= 0; --i){
      let r = Math.floor(Math.random() * namesLeftToTest.length);
      let randomName = namesLeftToTest[r];
      l.items.forEach(v=>{
        if (v.name == randomName) {
          assert(v.bought === false);
          l.buy(randomName);
          assert(v.bought === true);
        }
      });
      namesLeftToTest.splice(r, 1);
    }
  }

  boughtItems(){
    let l = new GroceryList('addToList');

    let names = ['one', 'anot h er item ', 'yet anythr item', 'something', 'yeah'];
    for(let i = 0; i < names.length; ++i){
      l.addToList(names[i]);
    }

    l.buy(names[0]);
    l.buy(names[2]);
    let boughtItems = l.boughtItems();

    assert(boughtItems.length === 2);
    assert(l.items.length === names.length);

    let hasBoughtName0 = boughtItems.map(v=>v.name).filter(s=>s==names[0]).length == 1;
    assert(hasBoughtName0);
    let hasBoughtName1 = boughtItems.map(v=>v.name).filter(s=>s==names[2]).length == 1;
    assert(hasBoughtName1);
    let hasNotBoughtOthers = boughtItems.map(v=>v.name).filter(s=>s!==names[0] && s!==names[2]).length == 0;
    assert(hasNotBoughtOthers);
  }

  unboughtItems(){
    let l = new GroceryList('addToList');

    let names = ['one', 'anot h er item ', 'yet anythr item', 'something', 'hello'];
    for(let i = 0; i < names.length; ++i){
      l.addToList(names[i]);
    }

    l.buy(names[1]);
    l.buy(names[3]);
    let unboughtItems = l.unboughtItems();

    assert(unboughtItems.length === 3);
    assert(l.items.length === names.length);

    let hasUnboughtName0 = unboughtItems.map(v=>v.name).filter(s=>s==names[0]).length == 1;
    assert(hasUnboughtName0);

    let hasUnboughtName1 = unboughtItems.map(v=>v.name).filter(s=>s==names[2]).length == 1;
    assert(hasUnboughtName1);

    let hasUnboughtName4 = unboughtItems.map(v=>v.name).filter(s=>s==names[4]).length == 1;
    assert(hasUnboughtName4);

    let hasNoOtherUnbought = unboughtItems.map(v=>v.name).filter(s=>s!==names[1] && s!==names[3]).length == 3;
    assert(hasNoOtherUnbought);
  }

}