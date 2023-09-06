import { Express, Router, Request, Response, NextFunction } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import { createPost } from './utils';
import { getRandomInt } from '../../tests/utils/test_utils';
import posts from '../database/posts';
import users from '../database/users';

const router = Router();
const prefix = '/api';
const fs = require('fs'); //Module to read files
let loggedID = 1;

// ------------------------------------------ Post creation Routes -----------------------------------------
router.post('/posts', async (req: Request, res: Response) => {
  const { category, game, rate, title, description } = req.body;
  const userId = loggedID

  if(userId <= 0) {
    return res.status(400).json({ message: 'You must be logged in to post' });
  } else if(!category) {
    return res.status(400).json({ message: 'Category missing' });
  } else if(!game) {
    return res.status(400).json({ message: 'Game missing' });
  } else if(!title) {
    return res.status(400).json({ message: 'Title missing' });
  } else if(!description) {
    return res.status(400).json({ message: 'Description missing' });
  }

  let postID = getRandomInt(1, 1000);
  while(posts.some((post) => post.post_id === postID)) {
    postID = getRandomInt(1, 1000);
  }
  
  const newPost = createPost(userId, postID, category, game, rate, title, description);

  posts.push(newPost);
  
  return res.status(201).json( {
    message: 'Post sucessfully made',
    post: newPost,
  } );
});

// Route to delete a post
router.delete('/posts/:user_id/:post_id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.user_id);
  const postId = parseInt(req.params.post_id)
  loggedID = parseInt(req.query.loggedID as string);

  if(((loggedID !== 0) && (loggedID !== userId))){
    return res.status(401).json({ Error : 'Unauthorized' });
  }

  const postIndex = await posts.findIndex(post => post.post_id === postId);

  if(postIndex !== -1){
    await posts.splice(postIndex, 1);
    return res.status(201).json({ message: 'Post deleted' });
  }else{
    return res.status(404).json({ Error : 'User not found' });
  }
});


// Route to edit posts
router.put('/posts/:user_id/:post_id', (req: Request, res: Response) => {
  const requestBody = req.body;
  const userId = parseInt(req.params.user_id);
  const postId = parseInt(req.params.post_id);
  let status: string = req.params.status;

  loggedID = parseInt(req.query.loggedID as string);

  const postIndex = posts.findIndex((post: any) => post.post_id === postId);

  if(((loggedID !== 0) && (loggedID !== userId))){
    return res.status(401).json({ Error : 'Unauthorized' });
  }

  Object.assign(posts[postIndex], requestBody);
  status == "edited";
  console.log(status)
  return res.status(201).json({ message: 'Post edited' });
});

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};