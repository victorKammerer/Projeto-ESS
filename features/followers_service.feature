Feature: Followers
  As a user, I want to be able to follow other users and receive their updates in a specific section of the site.

  Scenario: Client follows a user
    Given that the service authenticates the client as "Alice"
    And the profile service returns an existing profile for "Bob"
    When the client sends a POST to the endpoint "/api/users/:id/follow", with the body "{\"id\":1}"
    Then the service should return a 200 status and the message "You are now following Bob!"
    And "Bob" should be added to the list of users that the client is following
    And the client should be added to the list of followers for "Bob"

  Scenario: Client unfollows a user
    Given that the service authenticates the client as "Alice"
    And the profile service returns an existing profile for "Bob"
    When the client sends a POST to the endpoint "/api/users/:id/unfollow", with the body "{\"id\":1}"
    Then the service should return a 200 status and the message "You are no longer following Bob!"
    And "Bob" should be removed from the list of users that the client is following
    And the client should be removed from the list of followers for "Bob"