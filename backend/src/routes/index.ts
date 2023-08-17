import { Express, Router, Request, Response, NextFunction } from 'express';
import { di } from '../di';
import TestController from '../controllers/test.controller';
import TestService from '../services/test.service';
import users from '../database/users';

const router = Router();
const prefix = '/api';

// -------------------------------- FOLLOWERS ROUTES --------------------------------
// Route to get users
router.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// List followers for a user
router.get('/users/:id/followers', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followers = user.followers.map(followerId => {
    const follower = users.find(user => user.id === followerId);
    return follower;
  });

  res.json(followers);
});

// List following for a user
router.get('/users/:id/following', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const following = user.following.map(followingId => {
      const followingUser = users.find(user => user.id === followingId);
      return followingUser;
    });

    res.json(following);
});

// Unfollow a user
router.post('/users/:id/unfollow', (req: Request, res: Response) => {
  const unfollowId = parseInt(req.params.id);
  const id = parseInt(req.body.id);

  const user = users.find(user => user.id === id);
  const unfollowedUser = users.find(user => user.id === unfollowId);

  if(!user?.following.includes(unfollowId)) {
    res.status(400).json({ message: 'You are not following this user' });
    return;
  }

  if (!user || !unfollowedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.following = user.following.filter(userId => userId !== unfollowId);
  unfollowedUser.followers = unfollowedUser.followers.filter(userId => userId !== id);

  res.json({ message: 'You are no longer following this user!'});
});

// Follow a user
router.post('/users/:id/follow', (req: Request, res: Response) => {
  const followId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const follower = users.find(user => user.id === followId);

  if (user?.following.includes(followId)) {
    res.status(400).json({ message: 'You are already following this user' });
    return;
  }

  if (!user || !follower) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.following.push(followId);
  follower.followers.push(id);
  res.json({ message: 'You are now following this user!'});
});
1
// Blocks a user
router.post('/users/:id/block', (req: Request, res: Response) => {
  const blockId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const blockedUser = users.find(user => user.id === blockId);

  if (user?.blocked.includes(blockId)) {
    res.status(400).json({ message: 'You have already blocked this user' });
    return;
  }

  if (!user || !blockedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.blocked.push(blockId);
  res.json({ message: 'You have blocked this user!'});
});

// Unblocks a user
router.post('/users/:id/unblock', (req: Request, res: Response) => {
  const unblockId = parseInt(req.params.id);
  const id = parseInt(req.body.id);
  const user = users.find(user => user.id === id);
  const unblockedUser = users.find(user => user.id === unblockId);

  if(!user?.blocked.includes(unblockId)) {
    res.status(400).json({ message: 'You have not blocked this user' });
    return;
  }

  if (!user || !unblockedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.blocked = user.blocked.filter(userId => userId !== unblockId);
  res.json({ message: 'You have unblocked this user!'});
});

// List blocked users
router.get('/users/:id/blocked/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const blockedUsersCount = user.blocked.length;

  res.json({ blockedUsersCount });
});

// Counter for followers
router.get('/users/:id/followers/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followersCount = user.followers.length;

  res.json({ followersCount });
});

// Counter for following
router.get('/users/:id/following/count', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);

  if(!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const followingCount = user.following.length;

  res.json({ followingCount });
});

// END OF FOLLOWERS ROUTES

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router
  );
};
