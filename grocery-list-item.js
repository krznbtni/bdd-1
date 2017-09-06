var assert = require('assert');

module.exports = class GroceryListItem {
  constructor(name, category = '', quantity = 1){
    assert(typeof name == 'string' && name != '', 'Tried to create an item with an invalid name');
    assert(typeof category == 'string', 'Tried to create an item with an non-string category');
    assert(typeof quantity == 'number' && quantity >= 1, 'Tried to create an item with an invalid quantity');

    this._name = name;
    this._category = category;
    this._quantity = quantity;
    this.bought = false;
  }

  get name(){ return this._name; }
  get category(){ return this._category; }
  get quantity(){ return this._quantity; }

  set name(name){
    assert(typeof name == 'string' && name != '', 'Tried to set an item\'s name to an invalid value');
    this._name = name;
  }
  set category(category){
    assert(typeof category == 'string', 'Tried to set an item\'s category to an invalid value');
    this._category = category;
  }
  set quantity(quantity){
    assert(typeof quantity == 'number' && quantity >= 1, 'Tried to set an item\'s quantity to an invalid value');
    this._name = quantity;
  }

}
