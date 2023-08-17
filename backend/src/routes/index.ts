import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import { loggedInId } from '../services/list.service';
import users from '../database/users';
import games from '../database/games';
import lists from '../database/lists';

const router = Router();
const prefix = '/api';


// ----------------------- LIST ROUTES ----------------------- //
// Importing users, games, and lists
import { ListEntry, EntryType, GameList } from '../models/list.model';
import { User } from '../models/user.model';
import { Game } from '../models/game.model';
import * as utils from '../services/list.service'

function setUsers(newUsers : User[]){
  users.length = 0;
  users.push(...newUsers);
}
function setList(newList : GameList[]){
  lists.length = 0;
  lists.push(...newList);
}
function setGames(newGames : Game[]){
  games.length = 0;
  games.push(...newGames);
}
function getGames(){
  return games;
}
function getUsers(){
  return users;
}
function getLists(){
  return lists;
}


// GET : List of games for a user
router.get('/users/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if(!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  
  return res.status(200).json(userLists);

});


// POST : Add a game to a user's list
router.post('/users/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  if(id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  
  const { gameId, entryType, reqDate } = req.body;

  const user = utils.getUser(id, users);
  const game = utils.getGame(gameId, games);
  const list = utils.getUsersList(id, lists);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!game) {
    return res.status(404).json({ message : 'Game not found' });
  }
  if (!list) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (utils.isGameInList(list, gameId)) {
    return res.status(409).json({ message : 'Game already exists in list' });
  }
  
  const lastEntryId = list.entries.length > 0 ? list.entries[list.entries.length - 1].entryId : 0;
  
  const nextEntry = {
    entryId : lastEntryId + 1,
    gameId,
    entryType,
    date : new Date(reqDate)
  };
  list.entries.push(nextEntry);
  return res.status(201).json(list);
});
  
// GET: Games of a certain entryType on a user's list
router.get('/users/:id/list/:entryType', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryType : string = req.params.entryType;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (entryType != EntryType.PLAYED && entryType != EntryType.ABANDONED && entryType != EntryType.WISHLIST) {
    return res.status(404).json({ message : 'Invalid entry type: ' + entryType });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }

  const filteredEntries = userLists.entries.filter((entry) => entry.entryType === entryType);
  const filteredList = {
    userId : userLists.userId,
    entries : filteredEntries
  };
  return res.status(200).json(filteredList);

});

// PUT : Edit a game on a user's list
router.put('/users/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = utils.getUser(id, users);
  const { entryType, reqDate } = req.body;
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! utils.isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  if (entryType != EntryType.PLAYED && entryType != EntryType.ABANDONED && entryType != EntryType.WISHLIST) {
    return res.status(400).json({ message : 'Invalid entry type' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries[entryIndex].entryType = entryType;
  userLists.entries[entryIndex].date = new Date(reqDate);
  return res.status(200).json(userLists.entries.find((entry) => entry.entryId === entryId));
});

// DELETE : Remove a game from a user's list
router.delete('/users/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = utils.getUser(id, users);
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! utils.isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries.splice(entryIndex, 1);
  return res.status(200).json({ message : 'Entry deleted' });
});

// GET: Search a name in a user's list
router.get('/users/:id/list/search/:name', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const name : string = req.params.name;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  const filteredEntries = userLists.entries.filter((entry) => {
    const game = utils.getGame(entry.gameId, games);
    if (!game) {
      return false;
    }
    return game.gameName.replace(/\s+/g, "").toLowerCase().includes(name.toLowerCase());
  });
  const filteredList = {
    userId : userLists.userId,
    entries : filteredEntries
  };
  return res.status(200).json(filteredList);
});

// GET: List ordered by criteria
router.get('/users/:id/list/:criteria/:order', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const criteria : string = req.params.criteria;
  const order : string = req.params.order;
  const user = utils.getUser(id, users);
  const userLists = utils.getUsersList(id, lists);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (criteria !== 'date' && criteria !== 'title') {
    return res.status(400).json({ message : 'Invalid criteria' });
  }
  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ message : 'Invalid order' });
  }
  const orderedEntries = userLists.entries.sort((a, b) => {
    if (criteria === 'date') {
      return (order.localeCompare('asc') == 0) ? (a.date.getTime() - b.date.getTime()) : (b.date.getTime() - a.date.getTime());
    }
    if (criteria === 'title') {
      const ag = utils.getGame(a.gameId, games);
      const bg = utils.getGame(b.gameId, games);
      if (!ag || !bg) {
        return 0;
      }
      return (order.localeCompare('asc') == 0) ? (ag.gameName.localeCompare(bg.gameName)) : (bg.gameName.localeCompare(ag.gameName));
    }
    return 0;
  });
  const orderedList = {
    userId : userLists.userId,
    entries : orderedEntries
  };
  return res.status(200).json(orderedList);
});


// ----------------------- END LIST ROUTES ------------------- //


export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
export { getGames, getUsers, getLists, setUsers, setList, setGames };