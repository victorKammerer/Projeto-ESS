export type User = {
  id: number;
  user: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  pronouns: string;
  bio: string;
  followers: number[];
  following: number[];
  blocked: number[];
}

export let users: User[] = [
  {
    id: 2,
    user: "Lighthalzen",
    email: "Lighthalzen@gmail.com",
    password: "2173498723191a",
    name: "City of",
    lastName: "Lighthalzen",
    pronouns: "it/it",
    bio: "This is the city of science!",
    followers: [],
    following: [],
    blocked: []
  },
  {
    id: 3,
    user: "Mathbonc",
    email: "Bonc@gmail.com",
    password: "40028922b",
    name: "Matheus",
    lastName: "Boncsidai",
    pronouns: "he/him",
    bio: "Hello There!",
    followers: [],
    following: [],
    blocked: []
  }
]

export default users;