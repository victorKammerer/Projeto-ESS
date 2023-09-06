import { Post } from "../models/post.model";

export function createPost(
    user_id: number,
    post_id: number,
    category: [string],
    game: string,
    rate: number,
    title: string = '',
    description: string = ''
  ):  Post {
    const newPost: Post = {
        user_id,
        post_id,
        status: 'active',
        date: new Date().toISOString(),
        category,
        game,
        rate,
        title,
        description,
        comments: 0,
    };
  
    return newPost;
  }

  