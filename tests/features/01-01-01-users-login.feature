Feature: Login for every configured user
  As a site administrator
  I want every user of the suite to be able to log in
  So that the role scenarios have the users they need

  Scenario: Webmaster can log in and provision the rest of the testing users
    Given I am a logged in user with the "Webmaster" user
    Then I should see "Log out"
    When I add testing users
     And I navigate to "/admin/people"
    Then I should see "admin_user"
     And I should see "authenticated_user"

  Scenario: Admin lands on the Admin Dashboard after logging in
    Given I am a logged in user with the "Admin" user
    Then the path should be "/dashboard/admin_dashboard"
     And I should see "Admin Dashboard"

  Scenario: A member without a role lands on the Default Dashboard after logging in
    Given I am a logged in user with the "Authenticated user" user
    Then the path should be "/dashboard/default_dashboard"
     And I should see "Default Dashboard"
