Feature: Creating an grocery list item
  As a user
  I should be able to create and set the name, category and quantity of an item

  Scenario: Failing to create an item with an invalid name
    Given that I have not entered a valid name for a new item
    When I try to create an item with that info
    Then no item should be created
    And I should be notified that a valid name is needed to be supplied

  Scenario: Failing to create an item with an invalid category
    Given that I have not entered a valid category for a new item
    When I try to create an item with that info
    Then no item should be created
    And I should be notified that a valid category must be supplied

  Scenario: Failing to create an item with an invalid quantity
    Given that I have entered less than 1 as quantity for a new item
    When I try to create an item with that info
    Then no item should be created
    And I should be notified that a quantity of 1 or more must be supplied


  Scenario: Failing to set the name of an item
    Given that I have not entered a valid name for an existing item
    When I try to set the "name" of the item to that
    Then nothing should happen to the item
    And I should be notified that a valid name is needed to be supplied

  Scenario: Failing to set the category of an item
    Given that I have not entered a valid category for an existing item
    When I try to set the "category" of the item to that
    Then nothing should happen to the item
    And I should be notified that a valid category must be supplied

  Scenario: Failing to set the quantity of an item
    Given that I have entered a quantity of an existing item to be less than 1
    When I try to set the "quantity" of the item to that
    Then nothing should happen to the item
    And I should be notified that a quantity of 1 or more must be supplied
