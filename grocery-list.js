var GroceryListItem = require('./grocery-list-item');

module.exports = class GroceryList {

  constructor(name){
    this.name = name;
    this.items = [];
    this.displayBoughtItems = true;
    this.displayUnboughtItems = true;

    //gör den statisk
    GroceryList.existingLists = GroceryList.existingLists || {};

    if (typeof name !== 'string' || name === ''){
      throw new Error ('Invalid input. Must be a non-empty string...');
    } else if (GroceryList.existingLists[name]) {
      throw new Error ('List name already exists!');
    }
    GroceryList.existingLists[name] = this;
  }

  addToList(name, category, quantity){
    let newItem = new GroceryListItem(name, category, quantity);

    let existingSameItem = this.items.find((i)=>{
      let sameOrNoCategory = !newItem.category || i.category == i.category;
      return sameOrNoCategory && !i.bought && i.name == newItem.name;
    });

    if (existingSameItem){
      existingSameItem.quantity += newItem.quantity;
    } else {
      this.items.push(newItem);
    }
  }

  buy(name, category, quantity){

    for (let item of this.item){
      if(item.name !== name || item.category !== category || !item.bought){
        continue;
      }

      item.quantity += quantity;
    }

    for(let item of this.items){
      if(item.name !== name || item.category !== category){
        continue;
      }

      item.bought = true;
    }

  }

  boughtItems(){
    return this.items.filter(i=>i.bought);
  }

  displayBoughtItems(){
    this.displayBoughtItems = !this.displayBoughtItems;
  }

  unboughtItems(){
    return this.items.filter(i=>!i.bought);
  }

  displayUnboughtItems(){
    this.displayUnboughtItems = !this.displayUnboughtItems;
  }

  sortByCategory(){
    let sortedArray = this.items.slice().sort((a, b) => {
      return a.category < b.category;
    });

    let isAscending = true;

    for (var i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] !== this.items[i]) {
        isAscending = false;
        break;
      }
    }

    if (isAscending) {
      //descending
      this.items.sort((a, b) => {
        return a.category > b.category;
      });
    } else {
      //ascending
      this.items = sortedArray;
    }
  }

  sortByName(){
    let sortedArray = this.items.slice().sort((a, b) => {
        return a.name < b.name;
    });

    let isAscending = true;

    for (var i = 0; i < sortedArray.length; i++) {
      if (sortedArray[i] !== this.items[i]){
        isAscending = false;
        break;
      }
    }

    if (isAscending) {
      //descending
      this.items.sort((a, b) => {
        return a.name > b.name;
      });
    } else {
      //ascending
      this.items = sortedArray;
    }
  }

  removeFromList(name){
    this.items.forEach((item, index)=>{
      if (item.name === name) {
        this.items.splice(index, 1);
      }
    });
  }

}
