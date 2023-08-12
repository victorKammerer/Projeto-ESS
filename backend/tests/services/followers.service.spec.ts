import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import users from '../../src/database/users';

const feature = loadFeature('../features/followers_service.feature');
const request = supertest(app);
let followResponse: supertest.Response;

defineFeature(feature, test => {
    test('Client follows a user', ({ given, when, then, and }) => {
        let client: typeof users[0] | null;

        given(/^that the system authenticates the client as "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            client = user ? user: null;
        });

        and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username, userid) => {
            const user = users.find(user => user.username === username);
            expect(user).not.toBeNull();
            expect(user?.id).toEqual(parseInt(userid));
        });

        and(/^"(.*)" is not in the list of users that the client is following$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.following).not.toContain(user?.id);
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
            let body_json = JSON.parse(body);

            if (client !== null){
                followResponse = await request.post(`${endpoint}`).send(body_json);
            }
        });

        then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" is added to the list of users that the client is following$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.following).toContain(user?.id);
        });

        and(/^the client is added to the list of followers for "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(user?.followers).toContain(client?.id);
        });
    });
    
    test('Client unfollows a user', ({ given, when, then, and }) => {
        let client: typeof users[0] | null;

        given(/^that the system authenticates the client as "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            client = user ? user : null;
        });

        and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username, userid) => {
            const user = users.find(user => user.username === username);
            expect(user).not.toBeNull();
            expect(user?.id).toEqual(parseInt(userid));
        });

        and(/^"(.*)" is in the list of users that the client is following$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.following).toContain(user?.id);
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
            let body_json = JSON.parse(body);

            if (client !== null){
                followResponse = await request.post(`${endpoint}`).send(body_json);
            }
        });

        then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" is removed from the list of users that the client is following$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.following).not.toContain(user?.id);
        });

        and(/^the client is removed from the list of followers for "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(user?.followers).not.toContain(client?.id);
        });
    });

    test('Client follows a user that does not exist', ({ given, when, then, and }) => { 
        let client: typeof users[0] | null;

        given(/^that the system authenticates the client as "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            client = user ? user : null;
        });

        and(/^the system does not have an existing profile for "(.*)" id$/, (userid) => {
            const user = users.find(user => user.id === userid);
            expect(user).toBeUndefined();
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
            let body_json = JSON.parse(body);

            if (client !== null){
                followResponse = await request.post(`${endpoint}`).send(body_json);
            }
        });

        then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

    });
    
    // Client blocks a user
    test('Client blocks a user', ({ given, when, then, and }) => {
        let client: typeof users[0] | null;

        given(/^that the system authenticates the client as "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            client = user ? user : null;
        });

        and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(user).not.toBeNull();
        });

        and(/^"(.*)" is not in the list of users that the client is blocking$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.blocked).not.toContain(user?.id);
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
            let body_json = JSON.parse(body);

            if (client !== null){
                followResponse = await request.post(`${endpoint}`).send(body_json);
            }
        });

        then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" is added to the list of users that the client is blocking$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.blocked).toContain(user?.id);
        });
    });

    // Client unblocks a user
    test('Client unblocks a user', ({ given, when, then, and }) => {
        let client: typeof users[0] | null;

        given(/^that the system authenticates the client as "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            client = user ? user : null;
        });

        and(/^the system has an existing profile for "(.*)" with id "(.*)"$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(user).not.toBeNull();
        });

        and(/^"(.*)" is in the list of users that the client is blocking$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.blocked).toContain(user?.id);
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body '(.*)'$/, async (endpoint, body) => {
            let body_json = JSON.parse(body);
            console.log(client);

            if (client !== null){
                followResponse = await request.post(`${endpoint}`).send(body_json);
                console.log(followResponse.body.message);
            }

            console.log(client);
        });

        then(/^the system returns a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" is removed from the list of users that the client is blocking$/, (username) => {
            const user = users.find(user => user.username === username);
            expect(client?.blocked).not.toContain(user?.id);
        });
    });

});
