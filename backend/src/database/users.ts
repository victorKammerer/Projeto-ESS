type User = {
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

const users: User[] = [
  {
    id: 1,
    user: "usuario1",
    email: "usuario1@example.com",
    password: "senha123",
    name: "Fulano",
    lastName: "Silva",
    pronouns: "ele/dele",
    bio: "Olá! Sou Fulano Silva e estou explorando o mundo da tecnologia.",
    followers: [],
    following: [],
    blocked: []
  },
  {
    id: 4,
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
    id: 4,
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