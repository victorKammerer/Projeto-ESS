import path from 'path';

const fs = require('fs');
const DATABASE_PATH = path.join(__dirname, '../database/users.json');

//Read JSON files
export function readUsers(){
    try {
        const dados = fs.readFileSync(DATABASE_PATH, 'utf8');
        return JSON.parse(dados);
    } catch (err) {
        console.log("File read failed:", err);
        return;
    }
}

//Write JSON files
export function writeUsers(users : any) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify(users, null, 2), 'utf8');
}

//Delete User
export function deleteUser(id : number, users : any) {
    const userArray = Object.values(users);
    const index = userArray.findIndex((user : any) => user.id === id);

    if (index !== -1) {
        try{
            userArray.splice(index,1);
            writeUsers(userArray);
            return; 
        }catch(err){
            console.log("File could not be written");
            return;
        }
    } else {
        console.log('Could not find user')
        return; 
    }
}
  
//Getters
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

export function getUserByUser(user : string, users : any) {
    try{
        const foundUser = users.find((users:any) => users.user === user);
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

  