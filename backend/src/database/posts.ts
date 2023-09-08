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
        user_id: 3,
        post_id: 7,
        status: "active",
        date: "2021-01-10",
        category: ["Action", "Adventure"],
        game: "The Legend of Zelda: Breath of the Wild",
        rate: 5,
        title: "Meu jogo favorito de todos os tempos!",
        description: "Não consigo parar de jogar The Legend of Zelda: Breath of the Wild. É simplesmente incrível. Alguém mais ama esse jogo?",
        comments: 12
    },
    {
        user_id: 3,
        post_id: 8,
        status: "active",
        date: "2021-03-20",
        category: ["RPG"],
        game: "The Witcher 3: Wild Hunt",
        rate: 5,
        title: "Geralt de Rívia, o melhor protagonista!",
        description: "The Witcher 3: Wild Hunt é um dos melhores RPGs que já joguei. A história e os personagens são incríveis, e Geralt é um protagonista lendário!",
        comments: 8
    },
    {
        user_id: 3,
        post_id: 9,
        status: "active",
        date: "2021-06-15",
        category: ["Strategy"],
        game: "Sid Meier's Civilization VI",
        rate: 4,
        title: "Civilization VI - Construindo Impérios",
        description: "Adoro jogos de estratégia e Civilization VI é uma obra-prima. Estou construindo meu império e tentando dominar o mundo!",
        comments: 5
    },
    {
        user_id: 3,
        post_id: 10,
        status: "active",
        date: "2022-02-05",
        category: ["Horror", "Survival"],
        game: "Resident Evil Village",
        rate: 4,
        title: "Sobrevivendo ao Terror em Resident Evil Village",
        description: "Resident Evil Village é assustador e emocionante. Alguma dica para sobreviver aos horrores deste jogo?",
        comments: 7
    },
    {
        user_id: 3,
        post_id: 11,
        status: "active",
        date: "2022-08-10",
        category: ["Action", "Adventure"],
        game: "Elden Ring",
        rate: 5,
        title: "Mal posso esperar por Elden Ring!",
        description: "Estou ansioso para jogar Elden Ring quando for lançado. Alguém mais está empolgado com este jogo?",
        comments: 3
    },
    {
        user_id: 4,
        post_id: 12,
        status: "active",
        date: "2023-03-15",
        category: ["RPG"],
        game: "The Elder Scrolls V: Skyrim",
        rate: 5,
        title: "Explorando Skyrim - Uma Aventura Épica!",
        description: "Estou mergulhando em Skyrim novamente e explorando todos os segredos deste mundo incrível. Quais são as suas histórias favoritas de Skyrim?",
        comments: 8
    },
    {
        user_id: 4,
        post_id: 13,
        status: "active",
        date: "2023-05-20",
        category: ["Adventure", "Puzzle"],
        game: "The Witness",
        rate: 4,
        title: "Resolvendo Quebra-Cabeças em The Witness",
        description: "The Witness tem alguns dos quebra-cabeças mais desafiadores que já encontrei. Estou adorando cada momento!",
        comments: 6
    },
    {
        user_id: 4,
        post_id: 14,
        status: "active",
        date: "2023-07-10",
        category: ["Horror", "Survival"],
        game: "Resident Evil 7: Biohazard",
        rate: 5,
        title: "Sobrevivendo aos Horrores de Resident Evil 7",
        description: "Resident Evil 7 é um dos jogos de terror mais assustadores que já joguei. Alguém mais teve pesadelos depois de jogar?",
        comments: 10
    },
    {
        user_id: 5,
        post_id: 15,
        status: "active",
        date: "2023-02-10",
        category: ["Action", "Adventure"],
        game: "The Legend of Zelda: Breath of the Wild",
        rate: 5,
        title: "A Jornada Épica em Breath of the Wild",
        description: "Estou vivendo uma jornada incrível em The Legend of Zelda: Breath of the Wild. Cada canto deste mundo é uma descoberta!",
        comments: 12
    },
    {
        user_id: 5,
        post_id: 16,
        status: "active",
        date: "2023-04-05",
        category: ["RPG"],
        game: "Final Fantasy VII Remake",
        rate: 5,
        title: "Revivendo a Épica Jornada de Cloud",
        description: "Final Fantasy VII Remake me fez reviver uma das melhores histórias dos RPGs. Que jogo incrível!",
        comments: 9
    },
    {
        user_id: 5,
        post_id: 17,
        status: "active",
        date: "2023-06-20",
        category: ["Action", "Shooter"],
        game: "DOOM Eternal",
        rate: 4,
        title: "Massacre Demoníaco em DOOM Eternal",
        description: "DOOM Eternal é uma explosão de ação e destruição. Estou despedaçando demônios como nunca antes!",
        comments: 7
    },
    {
        user_id: 5,
        post_id: 18,
        status: "active",
        date: "2023-09-05",
        category: ["Adventure", "Puzzle"],
        game: "The Witness",
        rate: 5,
        title: "Mentes Desafiadas em The Witness",
        description: "Os quebra-cabeças de The Witness estão me fazendo pensar fora da caixa. Alguém mais viciado nesse jogo?",
        comments: 11
    },
    {
        user_id: 6,
        post_id: 19,
        status: "active",
        date: "2023-04-12",
        category: ["Adventure", "Puzzle"],
        game: "Unravel",
        rate: 4,
        title: "Desvendando os Segredos de Unravel",
        description: "Unravel é um jogo cativante com uma história emocionante. Estou desvendando seus segredos!",
        comments: 6
    },
    {
        user_id: 6,
        post_id: 20,
        status: "active",
        date: "2023-07-25",
        category: ["Indie", "Platformer"],
        game: "Hollow Knight",
        rate: 5,
        title: "Explorando o Mundo de Hollow Knight",
        description: "Hollow Knight é um indie incrível. Estou explorando cada canto desse mundo misterioso.",
        comments: 8
    },
    {
        user_id: 8,
        post_id: 21,
        status: "active",
        date: "2023-04-18",
        category: ["Adventure", "Puzzle"],
        game: "Portal 2",
        rate: 5,
        title: "Resolvendo Portais em Portal 2",
        description: "Portal 2 é um quebra-cabeça fantástico. Estou adorando resolver os enigmas com portais!",
        comments: 6
    },
    {
        user_id: 8,
        post_id: 22,
        status: "active",
        date: "2023-07-02",
        category: ["RPG"],
        game: "The Witcher 3: Wild Hunt",
        rate: 5,
        title: "A Jornada de Geralt Continua",
        description: "The Witcher 3: Wild Hunt é uma obra-prima. Estou embarcando em mais aventuras com Geralt!",
        comments: 8
    },
    {
        user_id: 9,
        post_id: 23,
        status: "active",
        date: "2023-05-12",
        category: ["Action", "Shooter"],
        game: "Call of Duty: Warzone",
        rate: 4,
        title: "Batalhas Épicas em Call of Duty: Warzone",
        description: "Call of Duty: Warzone está repleto de batalhas intensas. Vamos para o combate!",
        comments: 7
    },
    {
        user_id: 9,
        post_id: 24,
        status: "active",
        date: "2023-08-20",
        category: ["Racing"],
        game: "Forza Horizon 5",
        rate: 5,
        title: "Correndo nas Estradas de Forza Horizon 5",
        description: "Forza Horizon 5 é uma experiência de corrida incrível. As paisagens são de tirar o fôlego!",
        comments: 5
    },
    {
        user_id: 10,
        post_id: 25,
        status: "active",
        date: "2023-06-05",
        category: ["Action", "Adventure"],
        game: "The Legend of Zelda: Breath of the Wild",
        rate: 5,
        title: "A Magia de Breath of the Wild",
        description: "The Legend of Zelda: Breath of the Wild é uma aventura mágica. Estou explorando cada canto deste mundo vasto!",
        comments: 9
    },
    {
        user_id: 10,
        post_id: 26,
        status: "active",
        date: "2023-09-10",
        category: ["RPG"],
        game: "Final Fantasy VII Remake",
        rate: 5,
        title: "Revivendo a Épica Jornada de Cloud",
        description: "Final Fantasy VII Remake me fez reviver uma das melhores histórias dos RPGs. Que jogo incrível!",
        comments: 11
    },
    {
        user_id: 11,
        post_id: 27,
        status: "active",
        date: "2023-07-15",
        category: ["Horror", "Survival"],
        game: "Resident Evil Village",
        rate: 4,
        title: "Sobrevivendo ao Terror em Resident Evil Village",
        description: "Resident Evil Village é assustador e emocionante. Alguma dica para sobreviver aos horrores deste jogo?",
        comments: 7
    },
    {
        user_id: 11,
        post_id: 28,
        status: "active",
        date: "2023-10-02",
        category: ["Action", "Shooter"],
        game: "DOOM Eternal",
        rate: 5,
        title: "Massacre Demoníaco em DOOM Eternal",
        description: "DOOM Eternal é uma explosão de ação e destruição. Estou despedaçando demônios como nunca antes!",
        comments: 8
    },
    {
        user_id: 12,
        post_id: 29,
        status: "active",
        date: "2023-08-12",
        category: ["Adventure", "Puzzle"],
        game: "The Witness",
        rate: 5,
        title: "Mentes Desafiadas em The Witness",
        description: "Os quebra-cabeças de The Witness estão me fazendo pensar fora da caixa. Alguém mais viciado nesse jogo?",
        comments: 6
    },
    {
        user_id: 12,
        post_id: 30,
        status: "active",
        date: "2023-11-05",
        category: ["Action", "Shooter"],
        game: "Halo Infinite",
        rate: 4,
        title: "Dominando o Multijogador de Halo Infinite",
        description: "Halo Infinite trouxe de volta a emoção do multijogador. Estou dominando as partidas!",
        comments: 7
    },
    {
        user_id: 13,
        post_id: 31,
        status: "active",
        date: "2023-09-25",
        category: ["Racing"],
        game: "Gran Turismo 7",
        rate: 5,
        title: "Velocidade Extrema em Gran Turismo 7",
        description: "Gran Turismo 7 é o melhor jogo de simulação de corrida que já joguei. Estou competindo nas pistas mais desafiadoras!",
        comments: 8
    },
    {
        user_id: 13,
        post_id: 32,
        status: "active",
        date: "2023-12-10",
        category: ["Simulation"],
        game: "The Sims 4",
        rate: 4,
        title: "Criando Histórias em The Sims 4",
        description: "The Sims 4 me permite ser o criador de histórias. Estou construindo vidas virtuais!",
        comments: 5
    },
];

export default posts;

export const getPosts = (): Post[] => {
    return posts;
}