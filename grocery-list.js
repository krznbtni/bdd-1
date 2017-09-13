let GroceryListItem = require('./grocery-list-item.js');

module.exports = class GroceryList {

  constructor(name){
    this.name = name;
    this.items = [];

    //gör den statisk
    GroceryList.existingLists = GroceryList.existingLists || [];

    if (typeof name !== 'string' || name === ''){
      throw new Error ('Invalid input. Must be a non-empty string...');
    } else if (GroceryList.existingLists.includes(name) === true) {
      throw new Error ('List name already exists!');
    }

    GroceryList.existingLists.push(name);
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

  sortByCategory(){

  }

  displayUnboughtItems(){
    this.displayUnboughtItems = !this.displayUnboughtItems;
  }

  removeFromList(){

  }

}
