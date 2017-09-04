Feature: Displaying which grocery items have been bought
  As a user
  I should be able to display which grocery items have been bought

  Scenario: Displaying bought grocery items
    Given that I have a grocery list with bought grocery items
    When I click the display-bought-grocery-items button
    Then only bought grocery items should be shown

  Scenario: Unsuccessfully displaying bought grocery items
    Given that I have not bought any grocery items yet
    When I click the display-bought-grocery-items button
    Then a message is shown stating that there are no bought grocery items to display