const GroceryList = require('./grocery-list');

class AppGui {

  constructor() {
    $('.list-detail-view').hide();
    $('#displayError').hide();


    // define events
    this.defineMainViewEvents();
    this.defineListDetailViewEvents();

    //this.autoCreateAndViewAList();
    this.clearModalInput();
  }

  autoCreateAndViewAList() {
    let newList = new GroceryList('hej');
    this.switchToDetailView('hej');
    this.currentList.addToList('Milk','Dairies', 5);
    this.currentList.addToList('Crisps','Snacks', 5);
    this.currentList.addToList('Cucumber','Vegetables', 5);
    this.currentList.addToList('Apple','Fruits', 5);
    this.currentList.addToList('Salmon','Sea...food?', 5);
    this.renderItems();
  }

  defineMainViewEvents() {
    $(document).on('click', '.lists #addListButton', function() {

      // get list name value
      let theListName = $('#listName').val()

      if (theListName === '') {
        document.getElementById("error-msg").innerHTML = 'Du måste ange ett namn på listan. Försök igen!';
        $("#displayError").show();
        setTimeout(function(){
          $("#displayError").hide();
        }, 3000);
      }

      // check if there is existing lists
      if (GroceryList.existingLists != undefined) {
        for (let key in GroceryList.existingLists) {
          if (theListName === key) {
            document.getElementById("error-msg").innerHTML = 'Listan finns redan, välj ett annat namn';
            $("#displayError").show();
            setTimeout(function(){
              $("#displayError").hide();
            }, 3000);
          }
        }
      }

      let newList = new GroceryList(theListName)

      $('#createdLists').prepend(
        $('<li id="' + newList.name + '">').append('<span>' + newList.name + '</span>')
        .append('<button class="btn btn-primary btn-sm show-detailed-view">show detailed view</button>')
        .append('<button class="btn btn-primary btn-sm delete-list-button">delete</button>')
      );



    });

    $('#add-list').on('click', () => this.openAddList());

    $(document).on('click', '.delete-list-button', function() {
      let theListName = $(this).parent().find('span').text();
      delete GroceryList.existingLists[theListName];
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
      that.currentList.addToList(name, $('#modal #category').val(), $('#modal #quantity').val() * 1);
      that.renderItems();
    });

    $('#back-button').on('click', ()=>this.switchToMainView());
    $('#sort-list-button').on('click', ()=>this.openSortList());
    $('#add-grocery').on('click', ()=>this.openAddGrocery());

    $(document).on('keyup', '#list-items li input', function() {
      let index = $(this).parent().data('index');
      let property = $(this).data('prop');
      let value = $(this).val();
      try {
        that.currentList.items[index][property] = value;
      } catch (e) {};
    });

    $(document).on('click', '#list-items li button', function() {
      let name = $(this).parent().find('[data-prop="name"]').val();
      let cat = $(this).parent().find('[data-prop="category"]').val();
      let q = $(this).parent().find('[data-prop="quantity"]').val() * 1;
      that.currentList.buy(name, cat, q);
      that.renderItems();
    });

    $(document).on('click', '#sort-list-by-category-button', function(){
      that.currentList.sortByCategory();
      that.renderItems();
    });

    $(document).on('click', '#sort-list-by-name-button', function(){
      that.currentList.sortByName();
      that.renderItems();
    });

    $(document).on('click', '#display-bought', function(){
      $('#list-items').empty();

      that.currentList.items.forEach((item, index) => {
        let button = `<button type="button" class="btn btn-success btn-sm">Buy</button>`;

        if (item.bought) {
          button = `<button type="button" class="btn btn-success btn-sm" disabled>Bought</button>`;

          $('#list-items').append(`
          <li data-index="${index}">
            <input data-prop="name" value="${item.name}">
            <input data-prop="category" value="${item.category}">
            <input data-prop="quantity" type="number" value="${item.quantity}">
            ${button}
          </li>
        `);
        }
      })
    });

    $(document).on('click', '#display-unbought', function(){
      $('#list-items').empty();

      that.currentList.items.forEach((item, index) => {
        let button = `<button type="button" class="btn btn-success btn-sm" disabled>Bought</button>`;

        if (!item.bought) {
          button = `<button type="button" class="btn btn-success btn-sm">Buy</button>`;

          $('#list-items').append(`
          <li data-index="${index}">
            <input data-prop="name" value="${item.name}">
            <input data-prop="category" value="${item.category}">
            <input data-prop="quantity" type="number" value="${item.quantity}">
            ${button}
          </li>
        `);
        }
      })
    });

    $(document).on('click', '#display-all', function(){
      that.renderItems();
    });

  }

  switchToMainView() {
    $('#modal').toggleClass('lists');
    $('#modal').toggleClass('detailed');

    $('.list-detail-view').hide();
    $('.main-view').show();
  }

  openAddGrocery() {
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

  openAddList() {
    let mb = $('.modal.lists .modal-body');
    mb.empty();
    mb.append(`
      <input placeholder="Enter list name" type="text" name="list-name" id="listName" autofocus>
    `);
  }

  openSortList(){
    let mb = $('.modal.detailed .modal-body');
    mb.empty();
    mb.append(`
      <div class="col-6">
        <button id="sort-list-by-category-button" type="button" class="btn btn-primary btn-sm">
          Sort By Category
        </button>
      </div>
      <div class="col-6">
        <button id="sort-list-by-name-button" type="button" class="btn btn-primary btn-sm">
          Sort By Name
        </button>
      </div>
    `);
  }

  switchToDetailView(listName){
    $('#modal').toggleClass('lists');
    $('#modal').toggleClass('detailed');

    this.currentList = GroceryList.existingLists[listName];

    $('.list-detail-view h2').text(listName);

    this.renderItems();

    $('.main-view').hide();
    $('.list-detail-view').show();
  }

  renderItems() {
    $('#list-items').empty();

    this.currentList.items.forEach((item, index) => {
      let button = `<button type="button" class="btn btn-success btn-sm">Buy</button>`;
      if (item.bought) {
        button = `<button type="button" class="btn btn-success btn-sm" disabled>Bought</button>`;
      }

      $(this).toggleClass('btn-success').text('Bought');
      $('#list-items').append(`
      <li data-index="${index}">
        <input data-prop="name" value="${item.name}">
        <input data-prop="category" value="${item.category}">
        <input data-prop="quantity" type="number" value="${item.quantity}">
        ${button}
      </li>
    `);
    });
  }

  clearModalInput() {
    $('#modal').on('hidden.bs.modal', function() {
      $(this).find('input,textarea,select').val('').end();
    });
  }

}

new AppGui();
