//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const WeeklyWeather = require("../models/WeeklyWeather"); // Model
const Coordinates = require('../models/Coordinates');

// Remove all documents that match conditions from the collection.


module.exports = function(model, callback, filter = {}){ // filter doc https://mongoosejs.com/docs/api/model.html#model_Model.remove

	model.deleteMany(filter, (err,doc)=>{
	    if(err) throw err // error handling
	    console.log("Removed")
	    callback();
	});
}
