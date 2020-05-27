//Library
const mongoose = require("mongoose");
const connectDB = require("./connectDb"); // Database connection module
const DailyWeather = require("./DailyWeather"); // Model


module.exports = function(obj, dbName) {

	connectDB("mongodb://localhost:27017/"+dbName)

	obj.save(err => { // save document inside collection
	    if(err) throw err // error handling
	    console.log("Document inserted!")
	    mongoose.disconnect() // disconnect connection from database once document is saved
	})
}