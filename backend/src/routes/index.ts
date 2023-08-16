import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import * as utils from './utils';

const router = Router();
const prefix = '/api';
const fs = require('fs'); //Module to read files
const loggedID = 2;


export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};

//* Create Post
router.post('/posts', (req,res) => {
  const { user_id, post_id, status, category, game, rate, title, description, comments } = req.body;
}

if(!user_id){
  return res.status(400).json({ message: 'You need to create a account to post!' });
}else if(!post_id){
  return res.status(400).json({ message: 'Nothing to look here, this post don\'t exist' });
}else if(!status){
  return res.status(400).json({ message: 'Nothing to look here, the owner deleted this post' });
}else if(!category){
  return res.status(400).json({ message: 'Category missing' });
}else if(!game){
  return res.status(400).json({ message: 'Game missing' });
}else if(!rate){
  return res.status(400).json({ message: 'Rate missing' });
}else if(!title){
  return res.status(400).json({ message: 'Your post need a title' });
}else if(!description){
  return res.status(400).json({ message: 'Your post need a description' });
}else if(!comments){
  return res.status(400).json({ message: 'No comments yet' });
}
