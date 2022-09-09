// den här filen (skapa en funktion) används för att connecta med databasen när det kommer en request. Och spara den här.

const knex = require("knex"); // importera knex så att det går att använda 
const config = require("./knexfile"); //vilken mapp och databas som ska användas
const db = knex(config.development)   //in knexfile.js -> development. Vi sparaden i variable och refererar till min databas

function getAllUsers(){
    return db("users")
}

async function addUser(user){ //Här skapas en ny user
    await db("users").insert(user) //insert är insert new data. Await väntar. async. jobbar ihop. Är vikigt när man skapar//något nytt ska den vänta på andra funktioner  
   return db("users").where({username:user.username})   //refererar till en specefik user i databasen. username är unikt                                 
}

function findUserByUsername(username){
    return db("users").where({username:username}).first();

}

function removeUser(id){
    return db("users").where({id:id}).del() //vi tittar i users tabellen, hittar id:t till id som ska bort, sen tar bort det med del()


}

module.exports = { //exporterar alla funktioner i denna fil som listas här. till index.js
    getAllUsers,
    addUser,
    findUserByUsername,
    removeUser  
}
