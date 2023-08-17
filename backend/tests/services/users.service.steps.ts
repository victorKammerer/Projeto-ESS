import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository'


const feature = loadFeature('tests/features/user_test.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    //let mockTestRepository: TestRepository;
    let response: supertest.Response;

    /*
    beforeEach(() => {
        mockTestRepository = di.getRepository<TestRepository>(TestRepository);
    });
    
    test("Creating a new user succesfully",({ given, when, then, and }) => {
        given(/^The service has a database containing users$/, async() => {
            //checar se o DB existe
        });
        and(/^The database does not contain a user "(.*)"$/, async(user) => {
            //checar se o usuário existe, caso sim excluir
        });

        when(/^A POST request is made to "(.*)" route with the request body (.*)$/, 
            async(method, route, reqBody) =>{
                response = await request.post(route).send({reqBody}); 
        });

        then(/^The service should respond with status code "(.*)" with the message "(.*)"$/, 
            async(statusCode, message) =>{
                expect(response.status).toBe(parseInt(statusCode, 10));
        });
    });
    */
});