import { Express, Router } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';

const router = Router();
const prefix = '/api';
const loggedInId : number = 1;


// ----------------------- LIST ROUTES ----------------------- //
// Importing users, games, and lists
import users from '../database/users';
import games from '../database/games';
import {lists, ListEntry, EntryType} from '../database/lists';

// Helpers 
function getUser(id : number) {
  return users.find((user) => user.id === id);
}
function getUsersList(id : number) {
  return lists.find((list) => list.userId === id);
}
function getGame(id : number) {
  return games.find((game) => game.gameId === id);
}
function isEntryInList(list : any, entryId : number) {
  return list.entries.find((entry : ListEntry) => entry.entryId === entryId);
}
function isGameInList(list : any, gameId : number) {
  return list.entries.find((entry : ListEntry) => entry.gameId === gameId);
}

// GET : List of games for a user
router.get('/user/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const user = getUser(id);
  const userLists = getUsersList(id);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if(!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  
  return res.status(200).json(userLists);

});


// POST : Add a game to a user's list
router.post('/user/:id/list', async (req, res) => {
  const id : number = parseInt(req.params.id);
  if(id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  
  const { gameId, entryType, reqDate } = req.body;

  const user = getUser(id);
  const game = getGame(gameId);
  const list = getUsersList(id);

  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!game) {
    return res.status(404).json({ message : 'Game not found' });
  }
  if (!list) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (isGameInList(list, gameId)) {
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
  return res.status(201).json(nextEntry);
});
  
// GET: Games of a certain entryType on a user's list
router.get('/user/:id/list/:entryType', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryType : number = parseInt(req.params.entryType);
  const user = getUser(id);
  const userLists = getUsersList(id);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (entryType < 1 || entryType > 3) {
    return res.status(404).json({ message : 'Invalid entry type' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }

  const filteredList = userLists.entries.filter((entry) => entry.entryType === entryType);
  return res.status(200).json(filteredList);

});

// PUT : Edit a game on a user's list
router.put('/user/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = getUser(id);
  const { entryType, reqDate } = req.body;
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = getUsersList(id);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  if (entryType < 1 || entryType > 3) {
    return res.status(404).json({ message : 'Invalid entry type' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries[entryIndex].entryType = entryType;
  userLists.entries[entryIndex].date = new Date(reqDate);
  return res.status(204).json(userLists.entries[entryIndex]);
});

// DELETE : Remove a game from a user's list
router.delete('/user/:id/list/:entryId', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const entryId : number = parseInt(req.params.entryId);
  const user = getUser(id);
  if (id !== loggedInId) {
    return res.status(401).json({ message : 'Unauthorized' });
  }
  const userLists = getUsersList(id);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (! isEntryInList(userLists, entryId)) {
    return res.status(404).json({ message : 'Entry not found' });
  }
  const entryIndex = userLists.entries.findIndex((entry) => entry.entryId === entryId);
  userLists.entries.splice(entryIndex, 1);
  return res.status(204).json({ message : 'Entry deleted' });
});

// GET: Search a name in a user's list
router.get('/user/:id/list/search/:name', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const name : string = req.params.name;
  const user = getUser(id);
  const userLists = getUsersList(id);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  const filteredList = userLists.entries.filter((entry) => {
    const game = getGame(entry.gameId);
    if (!game) {
      return false;
    }
    return game.gameName.replace(/\s+/g, "").toLowerCase().includes(name.toLowerCase());
  });
  return res.status(200).json(filteredList);
});

// GET: List ordered by criteria
router.get('/user/:id/list/:criteria/:order', async (req, res) => {
  const id : number = parseInt(req.params.id);
  const criteria : string = req.params.criteria;
  const order : string = req.params.order;
  const user = getUser(id);
  const userLists = getUsersList(id);
  if (!user) {
    return res.status(404).json({ message : 'User not found' });
  }
  if (!userLists) {
    return res.status(404).json({ message : 'List not found' });
  }
  if (criteria !== 'date' && criteria !== 'title') {
    return res.status(404).json({ message : 'Invalid criteria' });
  }
  if (order !== 'asc' && order !== 'desc') {
    return res.status(404).json({ message : 'Invalid order' });
  }
  const orderedList = userLists.entries.sort((a, b) => {
    if (criteria === 'date') {
      return (order == 'asc') ? (a.date.getTime() - b.date.getTime()) : (b.date.getTime() - a.date.getTime());
    }
    if (criteria === 'title') {
      const ag = getGame(a.gameId);
      const bg = getGame(b.gameId);
      if (!ag || !bg) {
        return 0;
      }
      return (order == 'asc') ? (ag.gameName.localeCompare(bg.gameName)) : (bg.gameName.localeCompare(ag.gameName));
    }
    return 0;
  });
  return res.status(200).json(orderedList);
});


// ----------------------- END LIST ROUTES ------------------- //


export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
