Feature: Marking one or several grocery items as bought
  As a user
  I should be able to mark one or several grocery items as bought

  Scenario: Marking atleast one grocery item as bought
    Given that I have already created a grocery list with atleast one grocery item
    And I have selected atleast one grocery item
    When I click the bought button
    Then the grocery items should be marked as bought

  Scenario: Trying to mark unselected grocery items as bought
    Given that I have already created a grocery list with atleast one grocery item
    And I have not selected a grocery item
    When I click the bought button
    Then no grocery items should be marked as bought