//routes BACKEND 6 ca 28:00

const express = require("express");
const router = express.Router();
const usersAndAnimal = require("../dbHelpers")


//----------------GET ALL ANIMALS ---------------//

router.get('/animal', (req, res)=>{
    usersAndAnimal.getAllAnimal() 
        .then(animal=>{ // kan heta vad som helst
            res.status(200).json(animal) //det du lägger i (users) skickas till frontend 
        })
        .catch(error=>res.status(500).json(error))
    
})

// ------------------CREATE INFO----------------------------/
//  ------- Om vi vill få information från användaren skapar vi en route/endpoint/url. I detta fall /users/register. 
// Det kan heta vad som helst men ska passa med syftet. I detta fall skapa/registerar en användare 
router.post("/users/animal",(req, res)=>{
    const credentials = req.body; //stores vad som kommer från req.body. credentials = autentiseringsuppgifter/referenser
    
    // if(!(credentials.username && credentials.password)){//if they dont exist !. båda måste existera. annars kommer 400 
    //     return res.status(400).json({message:"username and password required"})
    //         // om det inte uppfylls så stannar koden här. 
    // }

    // const hash = bcrypt.hashSync(credentials.password,12) // här krypterars lösenordet!! 
    // credentials.password = hash;
   
    usersAndAnimal.addUser(credentials)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(error=>res.status(500).json(error))

})


//-----------------------------------------//
// //BACKEND 5. 15:00.... 
// router.post('/users/:id/animal',(req,res)=>{  //connecta till user router, och sen hitta id till änvändaren
//     const {id}=req.params //har skapade vi varibeln id som innehåller det som kommer från /users/:id
//     const newAnimals = req.body
//     newAnimals["user_id"] = id; // för att veta att det är user_id. kolla i schemat över databser i migrations. För att länka samman databaserna
 
//     usersAndAnimal.findUserbyId(id)
//     .then(user=>{
//         if(!user){
//             res.status(404).json({message:"user does not exist"})
//         }else{
//             if(!newAnimals.title || !newAnimals.description){
//             res.status(400).json({message: "All fiels must be complete"})
//             }else{
//                 usersAndAnimal.addAnimal(newAnimals)
//                 .then(animal=>{
//                 res.status(200).json(animal)
//                 })
//                 .catch(error=>res.status(500).json(error))
//             }
//         }
//      })
//     .catch(error=>res.status(500).json(error))

// })   
module.exports = router;