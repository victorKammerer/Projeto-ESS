import { Post } from '../../../../backend/src/models/post.model';

type FeedItem = {
    authorId: number;
    authorName: string;
    content: string;
    date: string;
    type: string;
}

export { FeedItem };