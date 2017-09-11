let GroceryListItem = require('./grocery-list-item.js');

module.exports = class GroceryList {

  constructor(){

    this.items = [];
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

  buy(){
  }

  boughtItems(){
  }

  unboughtItems(){
    return this.items.filter(i=>!i.bought);
  }

  sortByCategory(){
    
  }

}
