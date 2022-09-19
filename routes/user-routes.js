const express = require("express");
const router = express.Router();
const usersAndAnimal = require("../dbHelpers")
const bcrypt = require("bcryptjs") //vi laddar ner och använder ett hashing-bibliotek som kallas bcrypt.


// --------------- GET ALL USERS---------------------------//
router.get("/users",(req, res)=>{ 
    usersAndAnimal.getAllUsers() 
    .then(users=>{ //users kan heta vad som helst
        res.status(200).json(users) //det du lägger i (users) skickas till frontend 
    })
    .catch(error=>res.status(500).json(error))
})
//-----------------------------------GET A USER BY USERNAME----------------//
router.get("/users/:username", (req,res)=>{ // kolla colon.//informationen finns i url. som är :username där finns förvarade
    
    //const username = req.params.username // kolla params! {destructuring}
    const {username} = req.params // samma som ovan. men mer professionellt. Om något är stored/förvaras i ett objekt.
                                  // tänk baklänges man går till objektet sedan sparar man det genom att skapa en varibeln i {NN} som sedan används      

    usersAndAnimal.findUserByUsername(username)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error)) 


}) 

//????????//-----------------------------------GET A USER BY ID----------------//
router.get("/users/:id", (req,res)=>{ // kolla colon.//informationen finns i url. som är :id där finns förvarade
    
    //const id = req.params.username // kolla params! {destructuring}
    const {id} = req.params // samma som ovan. men mer professionellt. Om något är stored/förvaras i ett objekt.
                                  // tänk baklänges man går till objektet sedan sparar man det genom att skapa en varibeln i {NN} som sedan används      

    usersAndAnimal.findUserByUsername(id)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error)) 


}) 

// ------------------CREATE A NEW USER----------------------------/
//  ------- Om vi vill få information från användaren skapar vi en route/endpoint/url. I detta fall /users/register. 
// Det kan heta vad som helst men ska passa med syftet. I detta fall skapa/registerar en användare 
router.post("/users/register",(req, res)=>{
        const credentials = req.body; //stores vad som kommer från req.body. credentials = autentiseringsuppgifter/referenser
        
        if(!(credentials.username && credentials.password)){//if they dont exist !. båda måste existera. annars kommer 400 
            return res.status(400).json({message:"username and password required"})
                // om det inte uppfylls så stannar koden här. 
        }

        const hash = bcrypt.hashSync(credentials.password,12) // här krypterars lösenordet!! 
        credentials.password = hash;
       
        usersAndAnimal.addUser(credentials)
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(error=>res.status(500).json(error))

})

// Delete a user

router.delete("/users/:id", (req,res)=>{ //primary key (som är id)när man tar bort en användare
    
    //const id = req.params.id // vi hämtar info från en url
    // DESTRUCTURING NEDAN 
    const {id} = req.params
    usersAndAnimal.removeUser(id) //skickar tillbaka en siffra 1 om det funkade -1 om det inte funkade
    .then(count=>{  // här skriver vi ett meddelande att id finns
        if(count>0){ 
            res.status(200).json({message:"User is deleted"})
        }else{
            res.status(404).json({message:"no user with that id" })
        }

    })
    .catch(error=>res.status(500).json(error))


}) 

// ----------LOGIN WITH AN EXISTING USER ----------//

router.post("/users/login", (req,res)=>{  // vi måste jämföra vårar eget lösenord med det krypterade.
    
   // const username = req.body.username //   Vi måste separerar username och password för att se om dom finns  (22:00 backend 4)
   // const password = req.body.password  // det gör vi här genom att spara dom i varsin variabel
    // DESTRUCTURING nedan 
    const {username,password} = req.body // såhär gör man. det skapar två variblar och får dom/hämtar från req.body 
    
    usersAndAnimal.findUserByUsername(username,password)
    .then(user=>{
        if(user && bcrypt.compareSync(password, user.password)){//Här är password från front end och user.password från back end
            res.status(200).json(user)
        } else {
            res.status(400).json({message:"User with that password does not exist"})
        }
        })
        .catch(error=>res.status(500).json(error))
})


module.exports = router;