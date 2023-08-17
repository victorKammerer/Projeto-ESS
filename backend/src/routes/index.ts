import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import * as utils from './utils';

import posts from '../database/posts';
import users from '../database/users';

const router = Router();
const prefix = '/api';

// const postConst: { user_id: number, post_id: number, status: string, date: string, category: string[], game: string, rate: number, title: string, description: string, comments: string}[] = []

let loggedID = 1;
let nextPostId = 1;


function verifyUserID(user_id: number) {
  const user = users.find((user) => user.user_id === loggedID);
  if(!user) {
    return null;
  }
  return user;
}

function verifyPostID(post_id: number) {
  const post = posts.find((post) => post.post_id === post_id);
  if(!post) {
    return null;
  }
  return post;
}

function verifyPostUserID(post_id: number) {
  const postUser = posts.find((post) => post.user_id === loggedID);
  if(!postUser) {
    return null;
  }
  return postUser;
}

//* Rotas para criar posts
router.post('/create', (req, res) => {
  const { user_id, post_id, status, date, category, game, rate, title, description, comments } = req.body;
  const newPost = { user_id, post_id: nextPostId, status, date, category, game, rate, title, description, comments };
  posts.push(newPost);
  nextPostId++;
  res.json({ message: 'Post created!', post: newPost});
});

router.get('/list', (req, res) => {
  res.json(posts);
});

//* Rotas para editar posts
router.put('/edit/:post_id/', (req, res) => {
  const postId = parseInt(req.params.post_id);
  const { user_id, status, date, category, game, rate, title, description, comments } = req.body;
  const postIndex = posts.findIndex(post => post.post_id === postId);
  if(postIndex !== -1){
    const post = posts[postIndex];
      if (userHasPermission(loggedID, post.user_id)) {
        posts[postIndex] = { ...post, user_id, status, date, category, game, rate, title, description, comments  };
        res.json({ message: 'Post updated successfully', post: posts[postIndex] });
      } else {
          res.status(403).json({ error: 'Permission denied' });
        }
  } else {
      res.status(404).json({ error: 'Post not found' });
  }
});

//* Rotas para deletar posts
router.delete('/delete/:post_id', (req, res) => {
  const postId = parseInt(req.params.post_id);
  const postIndex = posts.findIndex(post => post.post_id === postId);
  if(postIndex !== -1){
    const post = posts[postIndex];
      if (userHasPermission(loggedID, post.user_id)) {
        const deletedPost = posts.splice(postIndex, 1)[0];
        res.json({ message: 'Post deleted successfully', post: deletedPost });
      } else {
          res.status(403).json({ error: 'Permission denied' });
        }
  } else {
      res.status(404).json({ error: 'Post not found' });
  }
});

function userHasPermission(verifyUserID: number, verifyPostUserID: number): boolean {
  return verifyUserID === verifyPostUserID;
}

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};

//* Create Post
/*
router.post('/posts', (req,res) => {
  const { user_id, post_id, status, category, game, rate, title, description, comments } = req.body;

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

const posts = utils.readPosts();
const postArray = Object.values(posts);

try {
  if(postArray.some((posts:any) => posts.post == post_id)) {
    return res.status(409).json({ message: 'Username alrealdy exists' });
  }else if(postArray.some((posts:any) => posts.email === email)){
    return res.status(409).json({ message: 'Email alrealdy exists' });
  }
}catch(err){
  return res.status(400).json({Error : 'Could not find registered logs'});
}

const newPost = {
  user_id,
  post_id: posts.lenght + 1,
  status,
  category,
  game,
  rate,
  title,
  description,
  comments
}

try {
  posts.push(newPost);
  utils.writePosts(posts);
} catch (err) {
  return res.status(400).json({ Error : 'File could not be written' });
}

return res.status(201).json({ message: 'Your post was published!!'});
});

//* Delete Post
router.delete('/posts/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const posts = utils.readPosts();

  if(loggedID != id) {
    return res.status(401).json({ Error: 'Unauthorized'});
  }

  utils.deletePost(id, posts);


  return res.status(201).json({ message: 'Review deleted.'});
});

//* Post ID
router.get('/posts/:id', (req,res) => {
  const id = parseInt(req.params.id);
  
  if(loggedID != id) {
    return res.status(401).json({ Error: 'Unauthorized'});
  }

  const posts = utils.readPosts();
  const requestedPost = utils.getPostByID(id, posts);

  if(!requestedPost){
    return res.status(404).json({ Error: 'Post not found'});
  }

  res.status(200).json(requestedPost);
});

//* Edit Post
router.put('/posts/:id', (req,res) => {
  const requestedBody = req.body;
  const id = parseInt(req.params.id);

  const posts = utils.readPosts();
  const postsArray = Object.values(posts);
  const postIndex = posts.findIndex((posts: any) => post.id === id);
  const requestedPost = utils.getPostByID(id, posts);

  if(!requestedBody) {
    return res.status(404).json({ Error: 'Post not found'});
  } else if (loggedID != requestedPost.id) {
    return res.status(401).json({ Error: 'Unauthorized'});
  } else {
    if(postsArray.some((posts: any) => posts.post === requestedBody.post)) {
      return res.status(409).json({ message: ''})
    }
  }

  Object.assign(posts[postIndex], requestedBody);

  try {
    utils.writePosts(posts);
  } catch (err) {
    return res.status(400).json({ Error: 'File could not be written'});
  }

  return res.status(201).json({ message: 'Post edited'});
});


export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};*/