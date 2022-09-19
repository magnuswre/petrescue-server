// den här filen (skapa en funktion) används för att connecta med databasen när det kommer en request. Och spara den här.
//const knex = require("knex"); // importera knex så att det går att använda 
//const config = require("./knexfile"); //vilken mapp och databas som ska användas
//const db = knex(config.development)   //in knexfile.js -> development. Vi spara den i variable och refererar till min databas

const db = require('./dbConfig'); // den här raden erstätter koden ovan. Här bestäms med hjälp av dbConfig om det är om det är dev eller producion mode. 


function getAllUsers(){
    return db("users")
}

async function addUser(user){ //Här skapas en ny user
    //await db("users").insert(user) //insert är insert new data. Await väntar. async. jobbar ihop. Är vikigt när man skapar//något nytt ska den vänta på andra funktioner  
   //return db("users").where({username:user.username})   //refererar till en specefik user i databasen. username är unikt                                 
    
   return await db('users').insert(user,['id', 'username']) // Den här koden "ersätter" de två raderna ovan detta. Detta är för postgresql vill ha informationen    

}

function findUserByUsername(username){
    return db("users").where({username:username}).first();

}

function removeUser(id){
    return db("users").where({id:id}).del() //vi tittar i users tabellen, hittar id:t till id som ska bort, sen tar bort det med del()


}

//---- GET ANIMAL-----//

function getAllAnimal(){
    return db("animal")
}

//------

function findUserbyId(id){
    return db('users').where({id:id}).first()
}

//----

async function addAnimal(newAnimal){
    await db('animal')
    .where({user_id:newAnimal.user_id})
    .insert(newAnimal)
}


module.exports = { //exporterar alla funktioner i denna fil som listas här. till index.js
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser,
    getAllAnimal,
    findUserbyId,
    addAnimal

}
