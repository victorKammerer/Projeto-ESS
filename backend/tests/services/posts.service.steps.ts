import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';

import  Reviews  from '../../src/database/posts';
import exp from 'constants';

const feature = loadFeature('../features/posts.feature');

defineFeature(feature, test => {

    });

    a