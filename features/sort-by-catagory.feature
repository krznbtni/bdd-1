Feature: Sort grocery-list by category
  As a user I would like to be able to sort a grocery-list by category

  Scenario: Sort grocery-list by ascending category
    Given that there is an existing grocery-list
    And that grocery-list has more then zero items
    And it's not already sorted by ascending category
    When I click the sorting link/button for category
    Then the list should be sorted by ascending category

  Scenario: Sort grocery-list by descending category
    Given that there is an existing grocery-list
    And that grocery-list has more than zero items
    And it's sorted by ascending category
    When I click the sorting link/button for category
    Then the list should be sorted by descending category

  Scenario: Sort an empty grocery-list
    Given that there is an existing grocery-list
    And that grocery-list has zero items
    When I click the sorting link/button for category
    Then nothing should happen
