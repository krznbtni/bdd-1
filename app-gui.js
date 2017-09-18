const GroceryList = require('./grocery-list');

class AppGui {

  constructor(){
    // hide all views (better if in css)
    $('view').hide();

    // show main-view initially
    $('main-view').show();

    // define events
    this.defineMainViewEvents();
  }

  defineMainViewEvents() {
    $(document).on('click', '#addListButton', function() {

      let listName = $('#listName');

      new GroceryList(listName.val());
      console.log(GroceryList.existingLists);
    });
  }

}

new AppGui();