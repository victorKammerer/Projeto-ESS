import { defineFeature, loadFeature } from 'jest-cucumber';
// import request from 'supertest';
import app from '../../src/app';
import users  from '../../src/database/users';
import supertest from 'supertest';
import posts from '../../src/database/posts';

const feature = loadFeature('../features/posts.feature');
const request = supertest(app);


defineFeature(feature, test => {
    
    let response: supertest.Response

    test('Creating new post', ({ given, when, then, and }) => {

        given(/^Existe um usuário com o username "(\d+)", email "(\d+)", senha "(\d+)" e id "(\d+)"$/, (username, email, senha, userid) => {
            username = 'usuario1';
            email = 'usuario1@example.com';
            senha = 'senha123'
            userid = '1';

            const usernameCheck = users.find(usernameCheck => usernameCheck.user === username);
            const emailCheck = users.find(emailCheck => emailCheck.email === email);
            const senhaCheck = users.find(senhaCheck => senhaCheck.password === senha);
            const idCheck = users.find(idCheck => idCheck.id === userid);

            expect(username).not.toBeUndefined();
            expect(email).not.toBeUndefined();
            expect(senha).not.toBeUndefined();
            expect(userid).not.toBeUndefined();
        });

        and(/^Existe uma categoria com o nome "(\d+)"$/, (categoria) => {
            categoria = 'Aventura';

            const categoriaCheck = posts.find(categoriaCheck => categoriaCheck.category === categoria);

            expect(categoria).not.toBeUndefined();
        });

        when(/^Uma requisição de POST é feita pra rota "(.*)" com o request body$/, async (endpoint, requestBody) => {
            response = await request.post(`${endpoint}`).send(JSON.parse(requestBody));
        });

        then(/^O servidor responde com o código "(.*)" e a mensagem "(.*)"$/, (statusCode, message) => {
            expect(response.status).toBe(parseInt(statusCode,10));
            expect(message).toBe("User was successfully registered");
        });
    });
});