Feature: Adding an item to grocery-list
  As a user
  I should be able to add items to my grocery list so that I can remember to buy them.

  Scenario: Adding an item to a grocery list
    Given that I have a grocery list
    When I add an item to the list
    And that item has a name
    Then that item should be added to the grocery list.

  Scenario: Adding an item to a grocery list that's already in the list and unbought
    Given that I have a grocery list with at least 1 unbought item
    When I add an item to the list that matches an unbought item in the list
    Then I should increment the quantity of that item in the grocery list.
