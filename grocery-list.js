// Export the class GroceryList as a node module
module.exports = class GroceryList {

  // When a new GroceryList is created
  // set the properties name (from inargument)
  // and items (an empty array)
  constructor(name){
    if(typeof name !== "string" || name === ""){
      throw new Error("A list must have a name that is an non-empty string");
    }
    this.name = name;
    this.items = [];
  }

  addToList(name){
    this.items.push({name: name, bought: false});
  }

  buy(name){
    this.items.forEach(i=>{
      if (i.name == name){
        i.bought = true;
      }
    });
  }

  boughtItems(){
    return this.items.filter(i=>i.bought);
  }

  unboughtItems(){
    return this.items.filter(i=>!i.bought);
  }

}