Feature: Anonymous visitors reach the log in page
  As a visitor who is not signed in
  I want the site to lead me to the log in page
  So that I can sign in, or ask for a new password, instead of facing an error

  Scenario: The front page leads to the log in page
    Given I am an anonymous user
    When I go to the homepage
    Then the path should be "/user/login"
     And I should see "Log in"
     And I should not see "Access denied"

  Scenario: Asking for a new password ends on a page the visitor can see
    Given I am an anonymous user
    When I navigate to "/user/password"
    Then the path should be "/user/password"
    When I fill in "Username or email address" with "authenticated_user"
     # UIkit Admin, the theme of the sign-in screens, labels the button
     # "Send reset link" (core says "Submit").
     And I press "Send reset link"
    Then the path should be "/user/login"
     And I should not see "Access denied"
