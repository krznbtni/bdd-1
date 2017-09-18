module.exports = function () {

  this.Given(/^that I fill in a valid name for a new grocery list$/, async function () {
    // Navigate to the app in the browser
    await helpers.loadPage('http://localhost:3000');

    // Find the input field for list name
    let inputField = await driver.findElement(by.css('#listName'));

    // Fill in some text (the name of a list)
    let listName = "Grönsaker"
    await inputField.sendKeys(listName);
  });

  this.When(/^I click the create button$/, function () {
    // Click the button create list
    let btn = await driver.findElement(by.css('#addListButton'));
    await btn.click();
  });

  this.Then(/^a grocery list should be created$/, function () {

  });

  //efter listan är skapad - titta ifall ett nytt element skapats med listan (i when/then)

// };

// module.exports = {

//     url: 'http://www.google.se',

//     elements: {
//         searchInput: by.name('q'),
//         searchResultLink: by.css('div.g > h3 > a')
//     },

//     performSearch: async function(searchQuery) {
//         let selector = page.googleSearch.elements.searchInput;
//         await driver.findElement(selector).sendKeys(searchQuery, selenium.Key.ENTER);
//     }
// };


// module.exports = function () {

//     this.When(/^I search Google for "([^"]*)"$/, async function(searchQuery) {
//         await helpers.loadPage('http://www.google.se');
//         return page.googleSearch.performSearch(searchQuery);
//     });

//     this.Then(/^I should see some results$/, async function() {
//         await driver.wait(until.elementsLocated(by.css('div.g')), 10000)
//         let elements = await driver.findElements(by.css('div.g'));
//         expect(elements.length).to.not.equal(0);
//     });

// };