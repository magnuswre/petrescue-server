//Här skapar vi en server
require("dotenv").config() 
const express = require("express");
const res = require("express/lib/response"); 
const app = express();
const port = process.env.PORT || 8000; // letar efter en port i .env. Annars använd 8000
const bodyParser = require("body-parser") //importar funktioner, hjälper backend vilken typ av jsondata som kommer från frontend 34:10 i Backend 3 MIMO LIVE   
app.use(bodyParser.json()) //make it understand what json "do"
const cors = require('cors');
app.use(cors({origin:'*'}))

// IMPORT ROUTERS 
const usersRouter = require("./routes/user-routes")
const animalRouter = require("./routes/animal-routes")
//const testRouter = require("./routes/test-routes")

// ACTIVE (USE) ROUTES
app.use("/", usersRouter)
app.use("/", animalRouter)
//app.use("/", testRouter)
//WELCOME PAGE
app.get("/", (req, res)=>{ // endpoint med bara forward slash / är hemsidan. 
    res.status(200).json({message:"Welcome to the server"}) // med -> res <- så skickas det tillbaka till frontend
})

//    app.get("/users", (req, res)=>{  //  /users är en annan route. userurl
//    res.status(200).json({message:"users"})
//     })

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})


