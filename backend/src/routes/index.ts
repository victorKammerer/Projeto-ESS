import { Express, Router, Request, Response } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import * as utils from './utils';


const router = Router();
const prefix = '/api';
const fs = require('fs'); //Module to read files
const loggedID = 2;


// BEGIN OF USER ROUTES //

//*Create User
router.post('/users', (req,res) => {
  const { user, email, password, name, lastName, pronouns, bio } = req.body;

  //! CREATING AN USER WITH SAME ID WHEN DELETING
  //! THIS IS DUE TO ID == ARRAY SIZE
  //! TRY ANOTHER APPROACH FOR CREATING USER IDS

  //Checking missing info
  if(!user){
    return res.status(400).json({ message: 'Username missing' });
  }else if(!email){
    return res.status(400).json({ message: 'Email missing' });
  }else if(!password){
    return res.status(400).json({ message: 'Password missing' });
  }else if(!name){
    return res.status(400).json({ message: 'Name missing' });
  }else if(!lastName){
    return res.status(400).json({ message: 'Last name missing' });
  }

  const users = utils.readUsers();
  const usersArray = Object.values(users);

  //Checking already registered info
  try{
    if(usersArray.some((users:any) => users.user === user)){
      return res.status(409).json({ message: 'Username arealdy exists' });
    }else if(usersArray.some((users:any) => users.email === email)){
      return res.status(409).json({ message: 'Email arealdy exists' });
    }
  }catch(err){
    return res.status(400).json({Error : 'Could not find registered logs'});
  }

  const newUser ={
    id: users.length + 1,
    user,
    email,
    password,
    name,
    lastName,
    pronouns,
    bio
  }

  try{
    users.push(newUser);
    utils.writeUsers(users);
  }catch (err){
    return res.status(400).json({ Error : 'File could not be written' });
  }

  return res.status(201).json({ message: 'User was successfully registered' });
});

//*Delete User
router.delete('/users/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const users = utils.readUsers();

  if(loggedID != id){
    return res.status(401).json({ Error : 'Unauthorized' });
  }

  utils.deleteUser(id, users);
  
  return res.status(201).json({ message: 'User was successfully deleted' });
});

//*User Profile
router.get('/users/:id', (req,res) => {
  const id = parseInt(req.params.id);
  if(loggedID !== id){
    return res.status(401).json({ Error : 'Unauthorized' });
  }

  const users = utils.readUsers();
  const requestedUser = utils.getUserByID(id,users);

  if(!requestedUser){
    return res.status(404).json({ Error : 'User not found' });
  }

  //PRINT USER PROFILE INFO
  res.status(200).json(requestedUser);
});

//Edit user profile
router.put('/users/:id', (req,res) => {
  const requestBody = req.body;
  const id = parseInt(req.params.id);

  const users = utils.readUsers();
  const usersArray = Object.values(users);
  const userIndex = users.findIndex((user: any) => user.id === id);
  const requestedUser = utils.getUserByID(id,users);

  if(!requestedUser){
    return res.status(404).json({ Error : 'User not found' });
  }else if(loggedID != requestedUser.id){
    return res.status(401).json({ Error : 'Unauthorized' });
  }else{
    if(usersArray.some((users:any) => users.user === requestBody.user)){
      return res.status(409).json({ message: 'Username arealdy exists' });
    }else if(usersArray.some((users:any) => users.email === requestBody.email)){
      return res.status(409).json({ message: 'Email arealdy exists' });
    }
  }

  //EDIT USER
  Object.assign(users[userIndex], requestBody);

  try{
    utils.writeUsers(users);
  }catch (err){
    return res.status(400).json({ Error : 'File could not be written' });
  }

  return res.status(201).json({ message: 'User was successfully modified' });
});

// END OF USER ROUTES //

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};

