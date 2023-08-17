import { Post } from "../models/post.model";

export function createPost(
    user_id: number,
    post_id: number,
    status: string,
    date: string,
    category: [string],
    game: string,
    rate: number,
    title: string = '',
    description: string = '',
    comments: number
  ):  Post {
    const newPost: Post = {
        user_id,
        post_id,
        status,
        date,
        category,
        game,
        rate,
        title,
        description,
        comments,
    };
  
    return newPost;
  }