class AppGui {

  // Decisions to be made in the group:
  // Should we use a templating library?
  // Show we handle routing or is this trule one page without back/forward-button compability?
  // Show we use a heavy framework like Angular.js

  constructor(){
    // show first view
    $(()=>{this.buildIndexView();});
    this.allLists = [];
  }

  buildIndexView(){
    $('body').append('<button class="createList">Create list</button>');
    $('.createList').click(()=>{
      // Just for now ask for the list name by prompt - replace with input field/modal or something later
      let listName = prompt('Name of list?');
      // Here we also need a try catch to check for errors from the GroceryList constructor
      try {
        this.allLists.push(new GroceryList(listName));
      }
      catch(e){
        // If error notify the user in the GUI
        alert(e);
      }
      console.log(this.allLists);
    });
  }


}

new AppGui();