const GroceryList = require('./grocery-list');

class AppGui {

  constructor(){
    // hide all views (better if in css)
    $('.list-detail-view').hide();

    // define events
    this.defineMainViewEvents();
    this.defineListDetailViewEvents();
  }

  defineMainViewEvents() {
    $(document).on('click', '#addListButton', function() {

      let listName = $('#listName').val();

      let newList = new GroceryList(listName);
      console.log(GroceryList.existingLists);

      $('#createdLists').prepend(
        $('<li>').append(newList.name)
                  .append('<button class="show-detailed-view">show detailed view</button>')
      );

    });
  }

  defineListDetailViewEvents() {
    $(document).on('click', '.show-detailed-view', function() {
      $('.main-view').hide();
      $('.list-detail-view').show();
    });
  }

}

new AppGui();