import path from 'path';

const fs = require('fs');
const DATABASE_PATH = path.join(__dirname, '../database/posts.json');

export function readUsers() {
    try {
        const data = fs.readFileSync(DATABASE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log("File read failed:", err);
        return;
    }
}

export function writeUsers(users : any) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(users, null, 2), 'utf8');
}

export function readPosts() {
    try {
        const data = fs.readFileSync(DATABASE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.log("File read failed:", err);
        return;
    }
}

export function writePosts(posts : any) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(posts, null, 2), 'utf8');
}

export function deletePost(post_id : number, posts : any) {
    const postArray = Object.values(posts);
    const index = postArray.findIndex((post : any) => post.id === post_id);

    if (index !== -1) {
        try{
            postArray.splice(index,1);
            writePosts(postArray);
            return; 
        }catch(err){
            console.log("File could not be written");
            return;
        }
    } else {
        console.log('Could not find post')
        return; 
    }
}

export function getPostByID(post_id : string, posts : any) {
    try{
        const foundPost = posts.find((posts:any) => posts.id === post_id);
        if(foundPost){
            return foundPost;
        }else{
            console.log("Post not found");
            return;
        }
    }catch(err){
        console.log("ERR", err);
        return;
    }
}

export function getPostByPost(post : string, posts : any) {
    try{
        const foundPost = posts.find((posts:any) => posts.post === post);
        if(foundPost){
            return foundPost;
        }else{
            console.log("Post not found");
            return;
        }
    }catch(err){
        console.log("ERR", err);
        return;
    }
}

export function getPostbyCategory(category : string, posts : any) {
    try{
        const foundPost = posts.find((posts:any) => posts.category === category);
        if(foundPost){
            return foundPost;
        }else{
            console.log("Post not found");
            return;
        }
    }catch(err){
        console.log("ERR", err);
        return;
    }
}

export function getPostbyGame(game : string, posts : any) {
    try{
        const foundPost = posts.find((posts:any) => posts.game === game);
        if(foundPost){
            return foundPost;
        }else{
            console.log("Post not found");
            return;
        }
    }catch(err){
        console.log("ERR", err);
        return;
    }
}
