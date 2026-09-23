Feature: The Features page.
      As an admin user
      I want to see the features with their Gherkin scripts
      So that I can manage the acceptance tests of a project

  Scenario: Check if the admin user can see the Features page
    Given I am an anonymous user
     When I login with the "Admin" user
      And I visit "/admin/content/features"
     Then I should see "Features"
