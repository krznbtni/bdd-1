const GroceryList = require('./grocery-list');

class AppGui {

  constructor(){
    $('.list-detail-view').hide();

    // define events
    this.defineMainViewEvents();
    this.defineListDetailViewEvents();
  }

  defineMainViewEvents() {
    $(document).on('click', '#addListButton', function() {

      let listName = $('#listName').val();

      let newList = new GroceryList(listName);

      $('#createdLists').prepend(
        $('<li>').append('<span>'+newList.name+'</span>')
                  .append('<button class="show-detailed-view">show detailed view</button>')
      );

    });
  }

  defineListDetailViewEvents() {
    let that = this;
    $(document).on('click', '.show-detailed-view', function() {
      let b = $(this).prev().text();
      that.switchToDetailView(b);
    });
  }

  switchToDetailView(listName){
    this.currentList = GroceryList.existingLists[listName];
    // delete GroceryList.existingLists[listName];
    // this.currentList.sortByName();

    $('.main-view').hide();
    $('.list-detail-view').show();
  }

}

new AppGui();