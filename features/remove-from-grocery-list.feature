Feature: Removing an item from my grocery-list
  As a user
  I should be able to remove items from my grocery list so that I can remember to buy them.

  Scenario: removing an item from a grocery list
    Given that I have a grocery list with at least one item
    When I try to remove an item from the list
    Then that item should be removed from the grocery list.
