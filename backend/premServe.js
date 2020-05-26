const express = require("express")
const app=express()
const path=require("path")

const mongoose = require("mongoose")
const connectDb = require(__dirname+"\\Users"+"\\connectDb") // Database connection module
const insertUser = require(__dirname+"\\Users"+"\\insertUser") // Database insert module
const readUsers = require(__dirname+"\\Users"+"\\readUsers") // Database insert module
const Users = require(__dirname+"\\Users"+"\\Users")

//var pathHTML="C:\\Users\\rouxj\\ScriptsJavaScripts\\serveur\\firsto2.html"
const routeur=express.Router() //Routeur qui va diriger vers des pages du site !


app.use("/",express.static(__dirname+"\\public"))



/*
var client = require('mongodb').MongoClient; 
var url = 'mongodb://localhost:27017/'; 
client.connect(url,{ useNewUrlParser: true }, function(err,db) 
{	 
		var dbo=db.db("admin") 
	var cursor = dbo.collection('geeks4geeks').find();	 
	cursor.each(function (err,doc) 
	{ 
		if(doc!=null) 
		console.log(doc); 
	}); 
	db.close(); 
}); 

*/


routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname+"\\public"+"\\firsto2.html"))
})


app.use("/",routeur)
app.listen(8080)


var database1="firstDataBase"

// Insert some users
var user1 = new Users({ // Create new document
    name: "Johan ROUX",
    age: 20,
    role: "Example User"
});
var user2 = new Users({ // Create new document
    name: "Victor JUNG",
    age: 20,
    role: "Example User 2"
});

insertUser(user1);
insertUser(user2);

readUsers();


/*
		UNE AUTRE PAGE :
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

*/





