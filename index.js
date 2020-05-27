// Library
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")

const connectDb = require("./backend/connectDb") // Database connection module
const insertUser = require("./backend/insertUser") // Database insert module
const readUsers = require("./backend/readUsers") // Database insert module
const Users = require("./backend/Users"); // Models module
const weather = require("./backend/weather");


const app = express();
const routeur=express.Router() 



routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.use("/",express.static(__dirname+"/public"))
app.use("/",routeur)
app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200

// Test of insertion in database

var database = "mongoose"; // Database name

// Insert some users
var user1 = new Users({ // Create new document
    name: "John Doe",
    age: 19,
    role: "Example User"
});
var user2 = new Users({ // Create new document
    name: "Victor Jung",
    age: 20,
    role: "Example User 2"
});

//insertUser(user1);
//insertUser(user2);

readUsers('test');

weather();