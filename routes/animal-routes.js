//routes BACKEND 6 ca 28:00
const express = require("express");
const router = express.Router();
const animalInfo = require("../dbHelpers")


//----------------GET ALL ANIMALS ---------------//

router.get('/animals', (req, res)=>{
    animalInfo.getAllAnimals() 
        .then(animals=>{ // kan heta vad som helst
            res.status(200).json(animals) //det du lägger i (users) skickas till frontend 
        })
        .catch(error=>res.status(500).json(error))
    
})

// ------GET ANIMAL BY TITLE-----//

router.get("/animals/:title", (req,res)=>{ // kolla colon.//informationen finns i url. som är :username där finns förvarade
    
    //const username = req.params.username // kolla params! {destructuring}
    const {title} = req.params // samma som ovan. men mer professionellt. Om något är stored/förvaras i ett objekt.
                                  // tänk baklänges man går till objektet sedan sparar man det genom att skapa en varibeln i {NN} som sedan används      

     animalInfo.findAnimalByTitle(title)
    .then(animal=>{
        res.status(200).json(animal)
    })
    .catch(error=>res.status(500).json(error)) 


}) 


// ------------------CREATE ANIMAL INFO----------------------------/
//  ------- Om vi vill få information från användaren skapar vi en route/endpoint/url. I detta fall /users/animal. 
// Det kan heta vad som helst men ska passa med syftet. I detta fall skapa/registerar ett djur.  

    router.post("/animal",(req, res)=>{
    animalInfo.addAnimal(req.body)
    .then(animal=>{
        res.status(200).json(animal)
    })
    .catch(error=>res.status(500).json(error))

})

module.exports = router;


// //-----------------------------------------//
// // //BACKEND 5. 15:00.... 
// // router.post('/users/:id/animal',(req,res)=>{  //connecta till user router, och sen hitta id till änvändaren
// //     const {id}=req.params //har skapade vi varibeln id som innehåller det som kommer från /users/:id
// //     const newAnimals = req.body
// //     newAnimals["user_id"] = id; // för att veta att det är user_id. kolla i schemat över databser i migrations. För att länka samman databaserna
 
// //     usersAndAnimal.findUserbyId(id)
// //     .then(user=>{
// //         if(!user){
// //             res.status(404).json({message:"user does not exist"})
// //         }else{
// //             if(!newAnimals.title || !newAnimals.description){
// //             res.status(400).json({message: "All fiels must be complete"})
// //             }else{
// //                 usersAndAnimal.addAnimal(newAnimals)
// //                 .then(animal=>{
// //                 res.status(200).json(animal)
// //                 })
// //                 .catch(error=>res.status(500).json(error))
// //             }
// //         }
// //      })
// //     .catch(error=>res.status(500).json(error))

// })   
