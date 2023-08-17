import { User } from '../database/users';

export function createUser(
    id: number,
    user: string,
    email: string,
    password: string,
    name: string,
    lastName: string,
    pronouns: string = '',
    bio: string = '',
    followers: number[] = [],
    following: number[] = [],
    blocked: number[] = []
  ):  User {
    const newUser: User = {
      id,
      user,
      email,
      password,
      name,
      lastName,
      pronouns,
      bio,
      followers,
      following,
      blocked,
    };
  
    return newUser;
  }