Feature: The Cucumber dashboard.
      As an admin user
      I want the default dashboard as my front page
      So that I see the state of the testing at a glance

  Scenario: Check if the admin user lands on the default dashboard
    Given I am an anonymous user
     When I login with the "Admin" user
      And I visit "/dashboard/default_dashboard"
     Then I should see "Dashboard"
