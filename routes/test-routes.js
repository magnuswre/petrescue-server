const express = require("express");
const router = express.Router();
const testInfo = require("../dbHelpers")


//----------------GET ALL TESTS---------------//

router.get('/animal', (req, res)=>{
    testInfo.getAlltests() 
        .then(test=>{ // kan heta vad som helst
            res.status(200).json(test) //det du lägger i (users) skickas till frontend 
        })
        .catch(error=>res.status(500).json(error))
    
})