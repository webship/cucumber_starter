Feature: The Admin role writes a feature and moves it through the workflow
  As a member of the Admin role
  I want to write a feature with its Gherkin script and move it from step to step
  So that the listings show the state every feature is in

  Background:
    Given I am a logged in user with the "Admin" user

  Scenario: The Admin role writes a feature with a Gherkin script
    When I navigate to "/media/add/feature"
    Then I should not see "you do not have sufficient permissions"
    When I fill in "Name" with "Starter workflow feature"
     And I fill in the Ace editor with:
      """
      Feature: Sign in
        Scenario: A visitor opens the log in page
          Given I am on "/user/login"
          Then I should see "Log in"
      """
     And I press "Save"
    Then I should see "Feature Starter workflow feature has been created."
     And I should not see "You do not have access to transition"
    When I navigate to "/features?name=Starter%20workflow%20feature"
    Then I should see "To Do" in the "Starter workflow feature" row

  Scenario Outline: The Admin role moves the feature to "<state>"
    When I navigate to "/features?name=Starter%20workflow%20feature"
     And I click "Edit" in the "Starter workflow feature" row
     And I select "<state>" from "Change to"
     And I press "Save"
    Then I should see "Feature Starter workflow feature has been updated."
    When I navigate to "/features?name=Starter%20workflow%20feature"
    Then I should see "<state>" in the "Starter workflow feature" row

    Examples:
      | state       |
      | In Progress |
      | Implemented |
      | Published   |
      | To Do       |

  Scenario: The Admin role adds a product
    When I navigate to "/node/add/product"
     And I fill in "Name" with "Starter product"
     And I press "Save"
    Then I should see "Starter product has been created."
    When I navigate to "/products"
    Then I should see "Starter product"
