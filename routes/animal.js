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
//-----------------------------------------//
//BACKEND 5. 15:00.... 
router.post('/users/:id/animal',(req,res)=>{  //connecta till user router, och sen hitta id till änvändaren
    const {id}=req.params //har skapade vi varibeln id som innehåller det som kommer från /users/:id
    const newAnimals = req.body
    newAnimals["user_id"] = id; // för att veta att det är user_id. kolla i schemat över databser i migrations. För att länka samman databaserna
 
    usersAndAnimal.findUserbyId(id)
    .then(user=>{
        if(!user){
            res.status(404).json({message:"user does not exist"})
        }else{
            if(!newAnimals.title || !newAnimals.description){
            res.status(400).json({message: "All fiels must be complete"})
            }else{
                usersAndAnimal.addAnimal(newAnimals)
                .then(animal=>{
                res.status(200).json(animal)
                })
                .catch(error=>res.status(500).json(error))
            }
        }
     })
    .catch(error=>res.status(500).json(error))

})   
module.exports = router;