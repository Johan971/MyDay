//Library
const mongoose = require("mongoose");

const connectDB = require("./connectDb"); // Database connection module
var database = "mongoose" // Database name

const Users = require("./Users"); // Model


module.exports = function(user, dbName) {
	// Connect to database
	connectDB("mongodb://localhost:27017/"+dbName)

	user.save(err => { // save document inside Users collection
	    if(err) throw err // error handling
	    console.log("Document inserted!")
	    mongoose.disconnect() // disconnect connection from database once document is saved
	})
}