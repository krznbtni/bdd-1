Feature: Displaying which grocery items have not been bought yet
  As a user
  I should be able to display which grocery items have not been bought yet

  Scenario: Displaying unbought grocery items
    Given that I have a grocery list with unbought grocery items
    When I click the display-unbought-grocery-items button
    Then only unbought grocery items should be shown

  Scenario: Unsuccessfully displaying unbought grocery items
    Given that I have no unbought grocery items in my grocery list
    When I click the display-unbought-items button
    Then a message is shown stating that there are no unbought grocery items to display