import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di';
import TestRepository from '../../src/repositories/test.repository';
import {loadFeature, defineFeature} from 'jest-cucumber'
import * as utils from '../../src/services/list.service';
import * as routes from '../../src/routes/index';
import { User } from '../../src/models/user.model';
import { ListEntry, EntryType, GameList } from '../../src/models/list.model';
import { Game } from '../../src/models/game.model';

const feature = loadFeature('tests/features/lista_de_jogos_service.feature')
const request = supertest(app)

defineFeature(feature, (test) => {
    let response: supertest.Response;
    const previousUsers = routes.getUsers();
    const previousGames = routes.getGames();
    const previousLists = routes.getLists();

    beforeEach(() => {
        routes.setGames([]);
        routes.setUsers([]);
        routes.setList([]);
    });
    afterAll(() => {
        routes.setGames(previousGames);
        routes.setUsers(previousUsers);
        routes.setList(previousLists);
    });
    function makeAuthenticatedUser(userId: string){
        utils.setAuthenticatedUserID(parseInt(userId));
    }

    function makeUser(userId: string){
        let user = {
            id: parseInt(userId),
            username: "username",
            email: "...",
            followers: [],
            following: []
        }
        user.id = parseInt(userId);
        const users = routes.getUsers();
        if (users.find(u => u.id == parseInt(userId)) == undefined) routes.setUsers([...users, user]);

    }

    function makeList(userId: string, listId: string){
        let list = {
            userId: parseInt(userId),
            entries: []
        }
        const lists = routes.getLists();
        if (lists.find(l => l.userId == parseInt(listId)) == undefined) routes.setList([...lists, list]);
    }

    function makeEntryInList(listId: string, entryId: string, gameId: string, entryType: string, reqDate: Date){
        let entry = {
            entryId: parseInt(entryId),
            gameId: parseInt(gameId),
            entryType: entryType as EntryType,
            date: reqDate
        }
        const lists = routes.getLists();
        let list = lists.find(l => l.userId == parseInt(listId));
        if (list != undefined) {
            if (list.entries.find(e => e.entryId == parseInt(entryId)) == undefined) list.entries.push(entry);
            routes.setList([...lists.filter(l => l.userId != parseInt(listId)), list]);
        }
    }

    function makeGame(gameId: string){
        let game = {
            gameId: parseInt(gameId),
            gameName: "game",
        }
        const games = routes.getGames();
        if (games.find(g => g.gameId == parseInt(gameId)) == undefined) routes.setGames([...games, game]);
    }

    test('The user gets an existing user list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, 
        async (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server has a user registered with id "(.*)"$/, 
        async (userId) => {
            makeUser(userId);
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, 
        async (userId, listId) => {
            makeList(userId, listId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the server has a game registered with id "(.*)"$/, 
        async (gameId) => {
            makeGame(gameId);
        });
    
        and(/^the list with id "(.*)" has two entries with ids "(.*)" and "(.*)", with the games of ids "(.*)" and "(.*)" and entryType "(.*)" on both$/, 
        async (listId, entryId1, entryId2, game1Id, game2Id, entryType) => {
            makeEntryInList(listId, entryId1, game1Id, entryType, new Date("2021-05-06"));
            makeEntryInList(listId, entryId2, game2Id, entryType, new Date("2021-05-06"));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, 
        async (endpoint) => {
            response = await request.get(endpoint);
        });
    
        then(/^the response should return the list with id "(.*)" object$/, 
        async (listId) => {
            const lists = routes.getLists();
            let list = lists.find(l => l.userId == parseInt(listId));
            // Convert body date string to Date to compare
            let bodyList = response.body as GameList;
            bodyList.entries.forEach(e => { e.date = new Date(e.date) });
            expect(bodyList).toEqual(list);
        });
    
        and(/^return status code "(.*)"$/, 
        async (statusCode) => {
            expect(response.status).toBe(parseInt(statusCode));
        });
    });
    
    test('The user tries to get a non-existing user list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
            makeAuthenticatedUser(userId);
        });
    
        and(/^the server does not have a user registered with id "(.*)"$/, (userId) => {
            const users = routes.getUsers();
            if (users.find(u => u.id == parseInt(userId)) != undefined) routes.setUsers(users.filter(u => u.id != parseInt(userId)));
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
            
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user adds a game to its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has a single entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/, (endpoint, gameId, entryType, reqDate) => {
    
        });
    
        then(/^the response should return the list object with the new entry with id "(.*)"$/, (entryId) => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user tries to add a game to another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has no entries$/, (listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/, (endpoint, gameId, entryType, reqDate) => {
    
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user tries to add a repeated game to its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a POST to the endpoint "(.*)" with the body elements gameId = "(.*)", entryType = "(.*)" and reqDate = "(.*)"$/, (endpoint, gameId, entryType, reqDate) => {
    
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user gets all "Played" games from a list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" that corresponds to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then(/^the response should return the list object with the entry with id "(.*)"$/, (entryId) => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });

    test('The user gets all "Abandoned" games from an empty list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has no entries$/, (listId) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return an empty list object', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user edits an "Abandoned" game from its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a PUT to the endpoint "(.*)" with the body elements entryType = "(.*)" and reqDate = "(.*)"$/, (endpoint, entryType, reqDate) => {
    
        });
    
        then(/^the response should return the list object with the updated entry with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (entryId, entryType, reqDate) => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user tries to edit a "Wishlisted" game from another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a PUT to the endpoint "(.*)" with the body elements entryType = "(.*)" and reqDate = "(.*)"$/, (endpoint, entryType, reqDate) => {
    
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user deletes a game from its own list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {

        });

        and(/^the server has a user registered with id "(.*)"$/, (userId) => {

        });

        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {

        });

        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {

        });

        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {

        });

        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {

        });

        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {

        });

        when(/^the user sends a DELETE to the endpoint "(.*)"$/, (endpoint) => {

        });

        then('the response should return a sucess message', () => {

        });

        and(/^return status code "(.*)"$/, (statusCode) => {

        });
    });
    
    test('The user tries to delete a game from another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a DELETE to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user searches for a game in another users list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then(/^the response should return the list object with the entry with id "(.*)"$/, (entryId) => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user searches for a game in an empty list.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has no entries$/, (listId) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return an empty list object', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user sorts its own list by "Name", in ascending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return the list object with the entries sorted by the game name in ascending order', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user sorts another users list by "Date", in descending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return the list object with the entries sorted by the game date in descending order', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    test('The user tries to sort another users list by "Color", in ascending order.', ({ given, and, when, then }) => {
        given(/^that the server authenticates the user with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the server has a user registered with id "(.*)"$/, (userId) => {
    
        });
    
        and(/^the user with id "(.*)" has a list with corresponding id "(.*)"$/, (userId, listId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the server has a game registered with id "(.*)"$/, (gameId) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        and(/^the list with id "(.*)" has a entry with id "(.*)" corresponding to a game with id "(.*)" and entryType "(.*)" and reqDate "(.*)"$/, (listId, entryId, gameId, entryType, reqDate) => {
    
        });
    
        when(/^the user sends a GET to the endpoint "(.*)"$/, (endpoint) => {
    
        });
    
        then('the response should return an error message', () => {
    
        });
    
        and(/^return status code "(.*)"$/, (statusCode) => {
    
        });
    });
    
    
});