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

      let theListName = $('#listName').val();

      let newList = new GroceryList(theListName);

      $('#createdLists').prepend(
        $('<li>').append('<span>'+newList.name+'</span>')
                  .append('<button class="btn btn-primary btn-sm show-detailed-view">show detailed view</button>')
                  .append('<button class="btn btn-primary btn-sm delete-list-button">delete</button>')
      );
    });

    $(document).on('click', '.delete-list-button', function() {
      // SAVE THE SPAN TEXT
      let theListName = $(this).parent().find('span').text();

      // DELETE LIST OBJECT FROM BACKEND
      delete GroceryList.existingLists[theListName];

      // DELETE LIST OBJECT FROM DOM
      $(this).parent().remove();
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