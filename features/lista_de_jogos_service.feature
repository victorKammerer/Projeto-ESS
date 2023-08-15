Scenario: The user gets an existing user list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "1"
    And the entry with id "2" corresponds to a game with id "3"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    When the user sends a GET to the endpoint "/api/user/1/list"
    Then the response should return the list object
    And return status code "200"

Scenario: The user tries to get a non-existing user list.
    Given that the service authenticates the user with id "1"
    And the service does not have a user registered with id "9"
    When the user sends a GET to the endpoint "/api/user/1/list"
    Then the response should return an error message 
    And return status code "404"

Scenario: The user adds a game to it's own list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has a single entry with id "1"
    And the entry with id "1" corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the server has a game registered with id "1" 
    And the service has a game registered with id "1"
    When the user sends a POST to the endpoint "/api/user/1/list" with the body "{\"gameId\": 2, \"entryType\": \"played\", \"reqDate\" : \"2021-05-04\"}"
    Then the response should return the list object with the new entry with id "1"
    And return status code "201"

Scenario: The user tries to add a game to another user's list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "3" has a list with corresponding id "3"
    And the list with id "3" has no entries
    And the service has a game registered with id "1"
    When the user sends a POST to the endpoint "/api/user/3/list" with the body "{\"gameId\": 1, \"entryType\": \"played\", \"reqDate\" : \"2021-05-04\"}"
    Then the response should return an error message
    And return status code "401"

Scenario: The user tries to add a repeated game to it's own list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has a single entry with id "1"
    And the entry with id "1" corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the server has a game registered with id "1" 
    And the service has a game registered with id "1"
    When the user sends a POST to the endpoint "/api/user/1/list" with the body "{\"gameId\": 1, \"entryType\": \"played\", \"reqDate\" : \"2021-05-04\"}"
    Then the response should return an error message
    And return status code "409"


Scenario: The user gets all "Played" games from a list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "1" and entryType "wished" and reqDate "2021-05-04"
    And the entry with id "2" corresponds to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    When the user sends a GET to the endpoint "/api/user/2/list/played"
    Then the response should return the list object with the entry with id "2"
    And return status code "200"

Scenario: The user gets all "Abandoned" games from an empty list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has no entries
    When the user sends a GET to the endpoint "/api/user/2/list/abandoned"
    Then the response should return an empty list object
    And return status code "200"

Scenario: The user edits an "Abandoned" game from it's own list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has two entries with ids "1" and "2" 
    And the entry with id "1" corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the entry with id "2" corresponds to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    And the server has a game registered with id "1"
    When the user sends a PUT to the endpoint "/api/user/1/list/abandoned/1" with the body "{\"entryType\": \"played\", \"reqDate\" : \"2021-06-04\"}"
    Then the response should return the list object with the updated entry with id "1" and entryType "played" and reqDate "2021-06-04"
    And return status code "204"

Scenario: The user tries to edit a "Wishlisted" game from another user's list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the entry with id "2" corresponds to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    When the user sends a PUT to the endpoint "/api/user/2/list/wishlisted/1" with the body "{\"entryType\": \"played\", \"reqDate\" : \"2021-06-04\"}"
    Then the response should return an error message
    And return status code "401"
    
Scenario: The user deletes a game from it's own list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the entry with id "2" corresponds to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    And the server has a game registered with id "1"
    When the user sends a DELETE to the endpoint "/api/user/1/list/1"
    Then the response should return a sucess message
    And return status code "204"

Scenario: The user tries to delete a game from another user's list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the entry with id "2" corresponds to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    When the user sends a DELETE to the endpoint "/api/user/2/list/1"
    Then the response should return an error message
    And return status code "401"

Scenario: The user searches for a game in another user's list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the entry with id "2" corresponds to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    When the user sends a GET to the endpoint "/api/user/2/list/search/Minecraft"
    Then the response should return the list object with the entry with id "1"
    And return status code "200"

Scenario: The user searches for a game in an empty list.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has no entries
    When the user sends a GET to the endpoint "/api/user/2/list/search/Minecraft"
    Then the response should return an empty list object
    And return status code "200"

Scenario: The user sorts it's own list by "Name", in ascending order.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "1"
    And the user with id "1" has a list with corresponding id "1"
    And the list with id "1" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "1" and entryType "abandoned" and reqDate "2021-05-04"
    And the entry with id "2" corresponds to a game with id "3" and entryType "played" and reqDate "2021-05-04"
    And the server has a game registered with id "1"
    And the server has a game registered with id "3"
    When the user sends a GET to the endpoint "/api/user/1/list/title/asc"
    Then the response should return the list object with the entries sorted by the game name in ascending order
    And return status code "200"

Scenario: The user sorts another user's list by "Date", in descending order.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the entry with id "2" corresponds to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    When the user sends a GET to the endpoint "/api/user/2/list/date/desc"
    Then the response should return the list object with the entries sorted by the game date in descending order
    And return status code "200"

Scenario: The user tries to sort another user's list by "Color", in ascending order.
    Given that the service authenticates the user with id "1"
    And the service has a user registered with id "2"
    And the user with id "2" has a list with corresponding id "2"
    And the list with id "2" has two entries with ids "1" and "2"
    And the entry with id "1" corresponds to a game with id "4" and entryType "played" and reqDate "2021-05-01"
    And the entry with id "2" corresponds to a game with id "5" and entryType "played" and reqDate "2021-05-02"
    And the server has a game registered with id "4"
    And the server has a game registered with id "5"
    When the user sends a GET to the endpoint "/api/user/2/list/color/asc"
    Then the response should return an error message
    And return status code "400"



