import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

import posts from '../database/posts';
import users from '../database/users';

const router = Router();
const prefix = '/api';

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
router.post('/user_id/create', (req, res) => {
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

