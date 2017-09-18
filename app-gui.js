const GroceryList = require('./grocery-list');

class AppGui {

  // Decisions to be made in the group:
  // Should we use a templating library?
  // Should we handle routing or is this truly one page without back/forward-button compability?
  // Should we use a heavy framework like Angular.js

  constructor(){
    // hide all views (better if in css)
    $('view').hide();

    // show main-view initially
    $('main-view').show();

    // define events
    this.defineMainViewEvents();
  }

  defineMainViewEvents() {
    $(document).on('click', '#addList', function() {
      new GroceryList();
      console.log(GroceryList.existingLists);
    });
  }

}

new AppGui();