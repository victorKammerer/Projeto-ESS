type User = {
  id: number;
  username: string;
  email: string;
  followers: number[];
  following: number[];
  blocked: number[];
};

const users: User[] = [
  {
    id: 1,
    username: "Alice",
    email: "alice@example.com",
    followers: [],
    following: [],
    blocked: [],
  },
  {
    id: 2,
    username: "Bob",
    email: "bob@example.com",
    followers: [3],
    following: [2],
    blocked: [],
  },
  {
    id: 3,
    username: "Charlie",
    email: "charlie@example.com",
    followers: [3],
    following: [2],
    blocked: [],
  },
  {
    id: 5,
    username: "Junior",
    email: "junior@example.com",
    followers: [],
    following: [],
    blocked: [2],
  }
];

export default users;