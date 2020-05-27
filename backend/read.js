//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./Models/DailyWeather"); // Models

// Console log all documents that match conditions from the collection.

module.exports = function(obj, dbName, filter={}){ // filter doc https://mongoosejs.com/docs/api.html#model_Model.find

	connectDb("mongodb://localhost:27017/"+dbName) // Connect to database

	obj.find(filter, (err, founded)=>{ //find and return all documents inside obj collection
	    if(err) throw err // error handling
	    console.log(founded);
	    mongoose.disconnect();
	});
}