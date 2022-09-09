//Här skapar vi en server
const express = require("express");
const res = require("express/lib/response"); 
const app = express();
const port = 5000;
const bodyParser = require("body-parser") //importar funktioner, hjälper backend vilken typ av jsondata som kommer från frontend 34:10 i Backend 3 MIMO LIVE   
app.use(bodyParser.json()) //make it understand what json "do"

/*
axios.get("")
// IMPORT ROUTERS 
const usersRouter = require("./routes/user-routes")
// ACTIVE (USE) ROUTES
app.use("/", usersRouter)
*/
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