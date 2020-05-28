//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./Models/DailyWeather"); // Model


module.exports = function(obj, dbName) {

	connectDb("mongodb://localhost:27017/"+dbName)

	obj.save(err => { // save document inside collection
	    if(err) throw err // error handling
	    console.log("Document inseré!")
	    mongoose.disconnect() // disconnect connection from database once document is saved
	})

}