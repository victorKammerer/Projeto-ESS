import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import {createPost} from './utils';

import posts from '../database/posts';
import users from '../database/users';

const router = Router();
const prefix = '/api';

let loggedID = 1;
let nextPostId = 1;

router.post('/posts', (req, res) => {
  const { user_id, post_id, status, date, category, game, rate, title, description, comments } = req.body;

  if(!user_id){
    return res.status(400).json({ message: 'Você precisa estar logado!' });
  }else if(!category){
    return res.status(400).json({ message: 'Você precisa adicionar uma categoria' });
  }else if(!game){
    return res.status(400).json({ message: 'Você precisa adicionar um jogo' });
  }else if(!title){
    return res.status(400).json({ message: 'O titulo é obrigatório pra criação de posts' });
  }else if(!description){
    return res.status(400).json({ message: 'A descriçã é obrigatória pra criação de posts' });
  }

  const newPost = createPost(user_id, post_id, status, date, category, game, rate, title, description, comments);

  try {
    posts.push(newPost);
  } catch (err) {
    return res.status(400).json({ Error : 'File could not be written' });
  }

  return res.status(201).json({ message: 'Post was sucessfully registered' });
});

// //* Rotas para criar posts
// router.post('/user_id/create', (req, res) => {
//   const { user_id, post_id, status, date, category, game, rate, title, description, comments } = req.body;
//   const newPost = { user_id, post_id: nextPostId, status, date, category, game, rate, title, description, comments };
//   posts.push(newPost);
//   nextPostId++;
//   res.json({ message: 'Post created!', post: newPost});
// });

// router.get('/list', (req, res) => {
//   res.json(posts);
// });

// //* Rotas para editar posts
// router.put('/edit/:post_id/', (req, res) => {
//   const postId = parseInt(req.params.post_id);
//   const { user_id, status, date, category, game, rate, title, description, comments } = req.body;
//   const postIndex = posts.findIndex(post => post.post_id === postId);
//   if(postIndex !== -1){
//     const post = posts[postIndex];
//       if (userHasPermission(loggedID, post.user_id)) {
//         posts[postIndex] = { ...post, user_id, status, date, category, game, rate, title, description, comments  };
//         res.json({ message: 'Post updated successfully', post: posts[postIndex] });
//       } else {
//           res.status(403).json({ error: 'Permission denied' });
//         }
//   } else {
//       res.status(404).json({ error: 'Post not found' });
//   }
// });

// //* Rotas para deletar posts
// router.delete('/delete/:post_id', (req, res) => {
//   const postId = parseInt(req.params.post_id);
//   const postIndex = posts.findIndex(post => post.post_id === postId);
//   if(postIndex !== -1){
//     const post = posts[postIndex];
//       if (userHasPermission(loggedID, post.user_id)) {
//         const deletedPost = posts.splice(postIndex, 1)[0];
//         res.json({ message: 'Post deleted successfully', post: deletedPost });
//       } else {
//           res.status(403).json({ error: 'Permission denied' });
//         }
//   } else {
//       res.status(404).json({ error: 'Post not found' });
//   }
// });

// function userHasPermission(verifyUserID: number, verifyPostUserID: number): boolean {
//   return verifyUserID === verifyPostUserID;
// }

// export default (app: Express) => {
//   app.use(
//     prefix,
//     new TestController(router, di.getService(TestService)).router
//   );
// };

