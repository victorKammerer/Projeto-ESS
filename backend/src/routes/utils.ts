import path from 'path';

const fs = require('fs');
const DATABASE_PATH = path.join(__dirname, '../database/posts.json');

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

export function getUserByID(id : number, users : any) {
    try{
        const foundUser = users.find((users:any) => users.id === id);
        if(foundUser){
            return foundUser;
        }else{
            console.log("User not found");
            return;
        }
    }catch(err){
        console.log("ERR", err);
        return;
    }
}

export function getPostByID(post : string, posts : any) {
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

