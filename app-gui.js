const GroceryList = require('./grocery-list');

class AppGui {

  constructor(){
    $('.list-detail-view').hide();

    // define events
    this.defineMainViewEvents();
    this.defineListDetailViewEvents();

    this.autoCreateAndViewAList();
    this.clearModalInput();
  }

  autoCreateAndViewAList(){
    let newList = new GroceryList('hej');
    this.switchToDetailView('hej');
  }

  defineMainViewEvents() {
    $(document).on('click', '.lists #addListButton', function() {

      let theListName = $('#listName').val();

      let newList = new GroceryList(theListName);

      $('#createdLists').prepend(
        $('<li>').append('<span>'+newList.name+'</span>')
                  .append('<button class="btn btn-primary btn-sm show-detailed-view">show detailed view</button>')
                  .append('<button class="btn btn-primary btn-sm delete-list-button">delete</button>')
      );
    });

    $('#add-list').on('click', ()=>this.openAddList());

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

    $(document).on('click', '.detailed #addListButton', function() {
      let name = $('#modal #name').val();
      that.currentList.addToList(name, $('#modal #category').val(), $('#modal #quantity').val()*1);

      $('<li>')
      .append('<span>'+name+'</span>')
      .prependTo('#list-items');
    });

    $('#back-button').on('click', ()=>this.switchToMainView());
    $('#add-grocery').on('click', ()=>this.openAddGrocery());
  }

  switchToMainView(){
    $('#modal').toggleClass('lists');
    $('#modal').toggleClass('detailed');

    $('.list-detail-view').hide();
    $('.main-view').show();
  }

  openAddGrocery(){
    let mb = $('.modal.detailed .modal-body');
    mb.empty();
    mb.append(`
      <div class="col-12">
        Name:<br><input id="name" type="text" placeholder="Milk" autofocus>
      </div>
      <div class="col-12">
        Category:<br><input id="category" type="text" placeholder="Dairies (Optional)">
      </div>
      <div class="col-12">
        Quantity:<br><input id="quantity" type="number" value="1">
      </div>
    `);
  }

  openAddList(){
    let mb = $('.modal.lists .modal-body');
    mb.empty();
    mb.append(`
      <input placeholder="Enter list name" type="text" name="list-name" id="listName" autofocus>
    `);
  }

  switchToDetailView(listName){
    $('#modal').toggleClass('lists');
    $('#modal').toggleClass('detailed');

    this.currentList = GroceryList.existingLists[listName];
    // delete GroceryList.existingLists[listName];
    // this.currentList.sortByName();

    $('.list-detail-view h2').text(listName);

    $('.list-items').empty();

    this.currentList.items.forEach((item)=>{
      $('.list-items').append('<span>'+item.name+'</span>');
    });

    $('.main-view').hide();
    $('.list-detail-view').show();
  }

  clearModalInput() {
    $('#modal').on('hidden.bs.modal', function() {
      $(this).find('input,textarea,select').val('').end();
    });
  }

}

new AppGui();