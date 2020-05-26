//Library
const mongoose = require("mongoose");

const connectDb = require("./connectDb"); // Database connection module
var database = "mongoose"; // Database name
const Users = require("./Users"); // Models

module.exports = function(){

	connectDb("mongodb://localhost:27017/"+database) // Connect to database

	Users.find({}, (err, users)=>{ //find and return all documents inside Users collection
	    if(err) throw err // error handling
	    console.log(users);
	    mongoose.disconnect();
	});
}