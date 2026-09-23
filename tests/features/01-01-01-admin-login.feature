Feature: Admin login.
      As an anonymous user
      I want to log in as an admin user
      So that I can manage the acceptance testing of a project

  Scenario: Check if an anonymous user can log in as admin
    Given I am an anonymous user
     When I login with the "Admin" user
     Then I should see "Admin"
