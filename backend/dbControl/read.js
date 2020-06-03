//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("../models/DailyWeather"); // Models

// Console log all documents that match conditions from the collection.

module.exports = function(model, callback){ // filter doc https://mongoosejs.com/docs/api.html#model_Model.find

	model.find({}, (err, founded)=>{ //find and return all documents inside obj collection
	    if(err) throw err // error handling
	    console.log(founded);
	});
}