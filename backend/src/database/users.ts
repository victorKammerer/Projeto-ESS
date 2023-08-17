type User = {
    user_id: number;
    username: string;
    email: string;
    followers: number[];
    following: number[];
  };
  
  const users: User[] = [
    {
      user_id: 1,
      username: "Alice",
      email: "alice@example.com",
      followers: [],
      following: []
    },
    {
      user_id: 2,
      username: "Bob",
      email: "bob@example.com",
      followers: [],
      following: []
    },
    {
      user_id: 3,
      username: "Charlie",
      email: "charlie@example.com",
      followers: [],
      following: []
    },
    {
      user_id: 5,
      username: "Junior",
      email: "junior@example.com",
      followers: [],
      following: []
    }
  ];
  
  export default users;