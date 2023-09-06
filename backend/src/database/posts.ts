import { Post } from "../models/post.model";

let posts: Post[] = [
    {
        user_id: 1,
        post_id: 1,
        status: "active",
        date: "2021-01-01",
        category: ["Action", "Adventure"],
        game: "Hollow Knight",
        rate: 5,
        title: "Primeiro Post no forum pessoal!! Hollow Knight",
        description: "Usando essa oportunidade para dar as boas vindas à todos os novos membros que chegarem aqui, vamos fazer um espaço massa pra todo mundo compartilhar e discutir nossa opinião em jogos!! Meu jogo favorito é Hollow Knight!!",
        comments: 2
    },
    {
        user_id: 1,
        post_id: 2,
        status: "active",
        date: "2021-04-01",
        category: ["Action", "Adventure"],
        game: "It takes two",
        rate: 5,
        title: "Jogo massa",
        description: "Po galera joguei com a amada mt massa",
        comments: 5
    },
    {
        user_id: 1,
        post_id: 3,
        status: "deactived",
        date: "2021-09-23",
        category: ["Action", "Adventure"],
        game: "It takes two",
        rate: 2,
        title: "Horrendo",
        description: "Joguei com o amado horrivel",
        comments: 59
    },
    {
        user_id: 1,
        post_id: 4,
        status: "edited",
        date: "2021-02-06",
        category: ["Platform"],
        game: "Celeste",
        rate: 2,
        title: "Terminei o jogo!!!",
        description: "postando aqui pra quando terminar, ate agora esta dificil. Terminei galera jogo muito massa",
        comments: 0
    },
    {
        user_id: 2,
        post_id: 5,
        status: "active",
        date: "2021-01-01",
        category: ["Action", "Adventure"],
        game: "Hollow Knight",
        rate: 5,
        title: "Primeiro Post no forum pessoal!! Hollow Knight",
        description: "Usando essa oportunidade para dar as boas vindas à todos os novos membros que chegarem aqui, vamos fazer um espaço massa pra todo mundo compartilhar e discutir nossa opinião em jogos!! Meu jogo favorito é Hollow Knight!!",
        comments: 2
    },
    {
        user_id: 1,
        post_id: 6,
        status: "active",
        date: "2023-07-05",
        category: ["Adventure", "Puzzle"],
        game: "Unrailed",
        rate: 5,
        title: "Piuiiiiii olha o trem passando",
        description: "Po galera joguei com a amada mt massa",
        comments: 5
    },
    {
        "user_id": 2,
        "post_id": 5,
        "status": "active",
        "date": "2021-05-18",
        "category": ["FPS", "Shooter"],
        "game": "Call of Duty: Warzone",
        "rate": 4,
        "title": "Dominando o campo de batalha em Warzone",
        "description": "E aí pessoal, quem mais está jogando Warzone? Vamos formar um esquadrão imbatível!",
        "comments": 6
    },
    {
        "user_id": 2,
        "post_id": 6,
        "status": "active",
        "date": "2021-06-30",
        "category": ["Racing", "Sports"],
        "game": "F1 2021",
        "rate": 4,
        "title": "Correndo nas pistas em F1 2021",
        "description": "Olá, fãs de F1! Estou curtindo muito as corridas no F1 2021. Quem mais gosta de pilotar carros de corrida?",
        "comments": 7
    },
    {
        "user_id": 3,
        "post_id": 7,
        "status": "active",
        "date": "2021-07-25",
        "category": ["Simulation", "Adventure"],
        "game": "The Sims 4",
        "rate": 5,
        "title": "Minha história no The Sims 4",
        "description": "Oi pessoal! Estou criando uma história épica no The Sims 4. Vamos compartilhar nossas experiências!",
        "comments": 4
    },
    {
        "user_id": 3,
        "post_id": 8,
        "status": "active",
        "date": "2021-08-14",
        "category": ["RPG", "Fantasy"],
        "game": "Elden Ring",
        "rate": 5,
        "title": "Empolgado com Elden Ring",
        "description": "Elden Ring está chegando! Quem mais está empolgado com este novo RPG?",
        "comments": 9
    },
    {
        "user_id": 4,
        "post_id": 9,
        "status": "active",
        "date": "2021-09-05",
        "category": ["Action", "Adventure"],
        "game": "Horizon Zero Dawn",
        "rate": 4,
        "title": "Aloy e suas aventuras em Horizon Zero Dawn",
        "description": "Olá pessoal! Estou revisitando o mundo de Horizon Zero Dawn com a Aloy. Vamos compartilhar nossas jornadas!",
        "comments": 3
    },
    {
        "user_id": 4,
        "post_id": 10,
        "status": "active",
        "date": "2021-10-12",
        "category": ["Strategy", "Simulation"],
        "game": "Civilization VI",
        "rate": 5,
        "title": "Conquistando o mundo em Civilization VI",
        "description": "Quem mais gosta de construir impérios em Civilization VI? Vamos trocar estratégias!",
        "comments": 6
    }

];

export default posts;

export const getPosts = (): Post[] => {
    return posts;
}