import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import users from '../../src/database/users';
import exp from 'constants';
import { parse } from 'path';

const feature = loadFeature('../features/followers_service.feature');
const request = supertest(app);
let followResponse: supertest.Response;

defineFeature(feature, test => {

    test('Client follows a user', ({ given, when, then, and }) => {
        let endpoint : string;

        given(/^that the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);

            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the list of following of the "(\d+)" does not have an user with ID "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === 1);
            expect(user?.following).not.toContain(userid2);
        });

        when(/^a POST request is made to "(.*)"/, async (endpoint_) => {
            endpoint = endpoint_;
        });

        and(/^the request body is '(.*)'$/, async (body) => {
            let body_json = JSON.parse(body);

            followResponse = await request.post(`${endpoint}`).send(body_json);
        });

        then(/^the system returns a "(\d+)" status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(\d+)" is added to the list of followers of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.followers).toContain(userid1);
        });

        and(/^"(\d+)" is added to the list of following of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.following).toContain(userid1);
        });
    });

    test('Client unfollows a user', ({ given, when, then, and }) => {
        let endpoint : string;

        given(/^that the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);

            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the list of following of the "(\d+)" has an user with ID "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid1);
            expect(user?.following).toContain(userid2);
        });

        when(/^a POST request is made to "(.*)"/, async (endpoint_) => {
            endpoint = endpoint_;
        });

        and(/^the request body is '(.*)'$/, async (body) => {
            let body_json = JSON.parse(body);

            followResponse = await request.post(`${endpoint}`).send(body_json);
        });

        then(/^the system returns a "(\d+)" status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(\d+)" is removed from the list of followers of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.followers).not.toContain(userid1);
        });

        and(/^"(\d+)" is removed from the list of following of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.following).not.toContain(userid1);
        }); 
    });


    test('Client follows a user that does not exist', ({ given, when, then, and }) => {
        let endpoint : string;

        given(/^that the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the system does not have an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).toBeUndefined();
        });

        when(/^a POST request is made to "(.*)"/, async (endpoint_) => {
            endpoint = endpoint_;
        });

        and(/^the request body is '(.*)'$/, async (body) => {
            let body_json = JSON.parse(body);

            followResponse = await request.post(`${endpoint}`).send(body_json);
        });

        then(/^the system returns a "(\d+)" status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

    });


    test('Client blocks a user', ({ given, when, then, and }) => {
        let endpoint : string;

        given(/^that the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });
        
        and(/^the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);

            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the list of blocked of the "(\d+)" does not have an user with ID "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid1);
            expect(user?.blocked).not.toContain(userid2);
        });

        when(/^a POST request is made to "(.*)"/, async (endpoint_) => {
            endpoint = endpoint_;
        });

        and(/^the request body is '(.*)'$/, async (body) => {
            let body_json = JSON.parse(body);

            followResponse = await request.post(`${endpoint}`).send(body_json);
        });

        then(/^the system returns a "(\d+)" status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(\d+)" is added to the list of blocked of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.blocked).toContain(userid1);
        });
    });


      // Scenario: Client unblocks a user
      //   Given that the system has an existing user with ID "3"
      //   And the system has an existing user with ID "2"
      //   And the list of blocked of the "3" has an user with ID "2"
      //   When a POST request is made to "/api/users/2/unblock"
      //   And the request body is '{"id":3}'
      //   Then the system returns a "200" status and the message "You have unblocked this user!"
      //   And "3" is removed from the list of blocked of "2"

    test('Client unblocks a user', ({ given, when, then, and }) => {
        let endpoint : string;

        given(/^that the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);
            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });
        
        and(/^the system has an existing user with ID "(\d+)"$/, (userid) => {
            userid = parseInt(userid);

            const user = users.find(user => user.id === userid);
            expect(user).not.toBeUndefined();
        });

        and(/^the list of blocked of the "(\d+)" has an user with ID "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid1);
            expect(user?.blocked).toContain(userid2);
        });

        when(/^a POST request is made to "(.*)"/, async (endpoint_) => {
            endpoint = endpoint_;
        });

        and(/^the request body is '(.*)'$/, async (body) => {
            let body_json = JSON.parse(body);

            followResponse = await request.post(`${endpoint}`).send(body_json);
        });

        then(/^the system returns a "(\d+)" status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(\d+)" is removed from the list of blocked of "(\d+)"$/, (userid1, userid2) => {
            userid1 = parseInt(userid1);
            userid2 = parseInt(userid2);

            const user = users.find(user => user.id === userid2);
            expect(user?.blocked).not.toContain(userid1);
        });
    });


    // // Client blocks a user
    // test('Client blocks a user', ({ given, when, then, and }) => {
    //     let client: typeof users[0] | null;

    //     given(/^that the system authenticates the client as "(.*)"$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         client = user ? user : null;
    //     });

    //     and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(user).not.toBeNull();
    //     });

    //     and(/^"(.*)" is not in the list of users that the client is blocking$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(client?.blocked).not.toContain(user?.id);
    //     });

    //     when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
    //         let body_json = JSON.parse(body);

    //         if (client !== null){
    //             followResponse = await request.post(`${endpoint}`).send(body_json);
    //         }
    //     });

    //     then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
    //         expect(followResponse.status).toEqual(parseInt(statusCode));
    //         expect(followResponse.body.message).toEqual(message);
    //     });

    //     and(/^"(.*)" is added to the list of users that the client is blocking$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(client?.blocked).toContain(user?.id);
    //     });
    // });

    // // Client unblocks a user
    // test('Client unblocks a user', ({ given, when, then, and }) => {
    //     let client: typeof users[0] | null;

    //     given(/^that the system authenticates the client as "(.*)"$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         client = user ? user : null;
    //     });

    //     and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(user).not.toBeNull();
    //     });

    //     and(/^"(.*)" is in the list of users that the client is blocking$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(client?.blocked).toContain(user?.id);
    //     });

    //     when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
    //         let body_json = JSON.parse(body);
    //         console.log(client);

    //         if (client !== null){
    //             followResponse = await request.post(`${endpoint}`).send(body_json);
    //             console.log(followResponse.body.message);
    //         }

    //         console.log(client);
    //     });

    //     then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
    //         expect(followResponse.status).toEqual(parseInt(statusCode));
    //         expect(followResponse.body.message).toEqual(message);
    //     });

    //     and(/^"(.*)" is removed from the list of users that the client is blocking$/, (username) => {
    //         const user = users.find(user => user.username === username);
    //         expect(client?.blocked).not.toContain(user?.id);
    //     });
    // });

});
