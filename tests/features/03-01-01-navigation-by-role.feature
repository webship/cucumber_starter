Feature: Every role has the navigation of its work and a way out
  As a signed-in member of the team
  I want the UIkit Admin shell with the links of my work and a Log out link
  So that I reach the listings and leave the site without typing an address

  Scenario: A member without a role has the shell and the Log out link
    Given I am a logged in user with the "Authenticated user" user
    When I set the viewport size to 1280x900
    Then I should see a ".uikit-admin-shell" element by attr
     And I should see "Log out" in the ".uikit-admin-rail__logout" element
     And I should not see "Features" in the ".uikit-admin-rail__body" element
    When I navigate to "/features"
    Then I should see "Access denied"

  Scenario Outline: The Admin role follows the "<link>" link of the navigation
    Given I am a logged in user with the "Admin" user
    When I set the viewport size to 1280x900
     And I follow "<link>"
    Then the path should be "<path>"
     And I should not see "Access denied"
     And I should not see "Insert selected"

    Examples:
      | link       | path        |
      | Features   | /features   |
      | Products   | /products   |
      | Components | /components |
      | Projects   | /projects   |

  Scenario: The Admin role logs out by the link
    Given I am a logged in user with the "Admin" user
    When I set the viewport size to 1280x900
     And I follow "Log out"
    Then the path should be "/user/login"
