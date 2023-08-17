import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository'
import users from '../../src/database/users';

const feature = loadFeature('tests/features/user_test.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let response: supertest.Response;
    
    test('Creating a new user succesfully', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database does not contain a user "(.*)"$/, async (username) => {
            if(users.find(user => user.user === username)){
                users.splice(users.findIndex(user => user.user === username),1);
            }
        });

        when(/^A POST request is made to "(.*)" route with the request body$/, async (endpoint, requestBody) => {
            response = await request.post(`${endpoint}`).send(JSON.parse(requestBody));
        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
            expect(message).toBe("User was successfully registered");
        });
    });

    test('Deleting a non existing user', ({ given, and, when, then }) => {
        let loggedID:number;

        given('The service has a database containing users', () => {

        });

        and(/^The database does not contain a user with id "(.*)"$/, async (id) => {
            const userIndex = users.findIndex(user => user.id === parseInt(id))
            if(userIndex !== -1){
                users.splice(userIndex,1);
            }
        });

        and(/^An admin with id "(.*)" is logged in$/, async (id) => {
            //Loggin in with id "id"
            loggedID = parseInt(id);
        });

        when(/^A DELETE request is made to "(.*)" route$/, async (endpoint) => {
            response = await request.delete(`${endpoint}`).query({loggedID : loggedID});
        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
            expect(message).toBe("User not found");
        });
    });

    test('Getting a not logged in user profile', ({ given, and, when, then }) => {
        let user : any;
        let loggedID:number;
        given('The service has a database containing users', () => {

        });

        and('The database contains the users', (docString) => {
            user = JSON.parse(docString); 
            if(users.find(user => user.id === user.id)){
                users.push(user);
            }        
        });

        and(/^A user with id "(.*)" is logged in$/, (id) => {
            loggedID = parseInt(id);
        });

        when(/^A GET request is made to "(.*)" route$/, async (endpoint) => {
            response = await request.get(`${endpoint}`).query({loggedID : loggedID});
        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
            expect(message).toBe('Unauthorized');
        });
    });

    // ------------- OTHER TESTS ------------------------ //

    test('Creating a new user with existing email', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database contain the user "(.*)" with email "(.*)"$/, (arg0, arg1) => {

        });

        when(/^A POST request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Creating a new user with existing user', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database contain the user "(.*)"$/, (arg0) => {

        });

        when(/^A POST request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Creating a new user with missing information', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database does not contain a user "(.*)"$/, (arg0) => {

        });

        when(/^A POST request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Deleting a user succesfully', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database contains a user with id "(.*)"$/, (arg0) => {

        });

        and(/^A user with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A DELETE request is made to "(.*)" route$/, (arg0) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Deleting a not logged in user', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and(/^The database contains a user with id "(.*)"$/, (arg0) => {

        });

        and(/^A user with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A DELETE request is made to "(.*)" route$/, (arg0) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Editing a user profile', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and('The database contains a user', (docString) => {

        });

        and(/^A user with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A PUT request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Editing a not logged in user profile', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and('The database contains the user', (docString) => {

        });

        and(/^A user with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A PUT request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Editing a non existing user profile', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and('The database contains the users', (docString) => {

        });

        and(/^An admin with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A PUT request is made to "(.*)" route with the request body$/, (arg0, docString) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('Getting user profile', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and('The database contains a user', (docString) => {

        });

        and(/^A user with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A GET request is made to "(.*)" route$/, (arg0) => {

        });

        then(/^The service should respond with status code "(.*)"$/, (arg0) => {

        });

        and('The service returns the object', (docString) => {

        });
    });

    test('Getting a non existing user profile', ({ given, and, when, then }) => {
        given('The service has a database containing users', () => {

        });

        and('The database contains a user', (docString) => {

        });

        and(/^An admin with id "(.*)" is logged in$/, (arg0) => {

        });

        when(/^A GET request is made to "(.*)" route$/, (arg0) => {

        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, (arg0, arg1) => {

        });
    });
});