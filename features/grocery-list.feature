Feature: Creating one or several grocery lists
  As a user
  I should be able to create one or several grocery lists

  Scenario: Creating a grocery list
    Given that I fill in a valid name for a new grocery list
    When I click the create button
    Then a grocery list should be created

  Scenario: Trying to create a list with an invalid name
    Given that I do not fill in a valid name for a new grocery list
    When I click the create button
    Then a grocery list should not be created
    And an error message should be shown stating that I must fill in a name for the list

  Scenario: Trying to create a list which name has already been used
    Given that I fill in a valid name for a new grocery list that has already been used
    When I click the create button
    Then a grocery list should not be created
    And an error message should be shown stating that I have already used the name before