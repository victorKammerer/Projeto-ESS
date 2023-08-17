import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../../src/app';

import  Post  from '../../src/database/posts';
import exp from 'constants';

const feature = loadFeature('../features/posts.feature');


defineFeature(feature, test => {

    let response: any;

    test('Creating new posts', ({ given, when, then }) => {

        given('O usuario está autenticado', () => {
            
        });

        when(
            'the user creates a new forum post with:',
            async (table: any) => {
                const { user_id, post_id, status, date, category, game, rate, title, description, comments } = table.rowsHash();
                // Other fields like post_id, date, rate, number of comments can be added here too
                response = await request(app)
                    .post('/api/posts/create')
                    .send({
                        user_id,
                        post_id,
                        status,
                        date,
                        category,
                        game,
                        rate,
                        title,
                        description,
                        comments
                    });
            }
    }