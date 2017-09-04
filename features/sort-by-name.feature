Feature: Sort grocery-list by name
  As a User
  I would like to be able to sort a grocery-list by name

  Scenario: Sort grocery-list by ascending name
    Given that there is an existing grocery-list
    And that grocery-list has more then zero items
    And it's not already sorted by ascending name
    When I click the sorting link/button for name
    Then the list should be sorted by ascending name

  Scenario: Sort grocery-list by descending name
    Given that there is an existing grocery-list
    And that grocery-list has more then zero items
    And it's sorted by ascending name
    When I click the sorting link/button for name
    Then the list should be sorted by decending name

  Scenario: Sort an empty grocery-list
    Given that there is an existing grocery-list
    And that grocery-list has zero items
    When I click the sorting link/button for name
    Then nothing should happen
