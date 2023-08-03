import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import users from '../../src/database/users';

const feature = loadFeature('../features/followers_service.feature');
const request = supertest(app);
let followResponse: supertest.Response;

defineFeature(feature, test => {
    test('Client follows a user', ({ given, when, then, and }) => {
        let followerId: number | null;
        let followingId: number | null;

        given(/^that the service authenticates the client as "(.*)"$/, (arg0) => {
            const username = arg0;
            const follower = users.find(user => user.username === username);
            followerId = follower ? follower.id : null;
        });

        and(/^the profile service returns an existing profile for "(.*)"$/, (arg0) => {
            const username = arg0;
            const following = users.find(user => user.username === username);
            followingId = following ? following.id : null;
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body "(.*)"$/, async (arg0, arg1) => {
            if(followingId !== null)
                arg0 = arg0.replace(':id', followingId.toString());

            const endpoint = arg0;
            const body = arg1;
            if (followerId !== null && followingId !== null) {
                followResponse = await request.post(`${endpoint}`).send({ id: followerId });
            }
        });

        then(/^the service should return a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" should be added to the list of users that the client is following$/, (arg0) => {
            const follower = users.find(user => user.id === followerId);
            console.log(follower);
            expect(follower?.following).toContain(followingId);
        });

        and(/^the client should be added to the list of followers for "(.*)"$/, (username) => {
            console.log(username);
            const following = users.find(user => user.username === username);
            console.log(following);
            expect(following?.followers).toContain(followerId);
        });
    });

    test('Client unfollows a user', ({ given, when, then, and }) => {
        let followerId: number | null;
        let unfollowingId: number | null;

        given(/^that the service authenticates the client as "(.*)"$/, (arg0) => {
            const username = arg0;
            const follower = users.find(user => user.username === username);
            followerId = follower ? follower.id : null;
        });

        and(/^the profile service returns an existing profile for "(.*)"$/, (arg0) => {
            const username = arg0;
            const unfollowing = users.find(user => user.username === username);
            unfollowingId = unfollowing ? unfollowing.id : null;
        });

        when(/^the client sends a POST to the endpoint "(.*)", with the body "(.*)"$/, async (arg0, arg1) => {
            if(unfollowingId !== null)
                arg0 = arg0.replace(':id', unfollowingId.toString());

            const endpoint = arg0;
            const body = arg1;
            if (followerId !== null && unfollowingId !== null) {
                followResponse = await request.post(`${endpoint}`).send({ id: followerId });
            }
        });

        then(/^the service should return a (\d+) status and the message "(.*)"$/, (statusCode, message) => {
            expect(followResponse.status).toEqual(parseInt(statusCode));
            expect(followResponse.body.message).toEqual(message);
        });

        and(/^"(.*)" should be removed from the list of users that the client is following$/, (arg0) => {
            const follower = users.find(user => user.id === followerId);
            expect(follower?.following).not.toContain(unfollowingId);
        });

        and(/^the client should be removed from the list of followers for "(.*)"$/, (username) => {
            const unfollowing = users.find(user => user.username === username);
            expect(unfollowing?.followers).not.toContain(followerId);
        });
    });
});
