Feature: Followers
  As a user, I want to be able to follow other users and receive their updates in a specific section of the site.

  Scenario: Client follows a user
    Given that the system authenticates the client as "Alice"
    And the system has an existing profile for "Bob" with id "2"
    And "Bob" is not in the list of users that the client is following
    When the client sends a POST to the endpoint "/api/users/2/follow", with the body '{"id":1}'
    Then the system returns a 200 status and the message "You are now following Bob!"
    And "Bob" is added to the list of users that the client is following
    And the client is added to the list of followers for "Bob"

  Scenario: Client unfollows a user
    Given that the system authenticates the client as "Charlie"
    And the system has an existing profile for "Bob" with id "2"
    And "Bob" is in the list of users that the client is following
    When the client sends a POST to the endpoint "/api/users/2/unfollow", with the body '{"id":3}'
    Then the system returns a 200 status and the message "You are no longer following Bob!"
    And "Bob" is removed from the list of users that the client is following
    And the client is removed from the list of followers for "Bob"

  Scenario: Client follows a user that does not exist
    Given that the system authenticates the client as "Alice"
    And the system does not have an existing profile for "52" id
    When the client sends a POST to the endpoint "/api/users/52/follow", with the body '{"id":1}'
    Then the system returns a 404 status and the message "User not found"

  Scenario: Client blocks a user
    Given that the system authenticates the client as "Alice"
    And the system has an existing profile for "Bob" with id "2"
    And "Bob" is not in the list of users that the client is blocking
    When the client sends a POST to the endpoint "/api/users/2/block", with the body '{"id":1}'
    Then the system returns a 200 status and the message "You have blocked Bob!"
    And "Bob" is added to the list of users that the client is blocking

  Scenario: Client unblocks a user
    Given that the system authenticates the client as "Junior"
    And the system has an existing profile for "Bob" with id "2"
    And "Bob" is in the list of users that the client is blocking
    When the client sends a POST to the endpoint "/api/users/2/unblock", with the body '{"id":5}'
    Then the system returns a 200 status and the message "You have unblocked Bob!"
    And "Bob" is removed from the list of users that the client is blocking