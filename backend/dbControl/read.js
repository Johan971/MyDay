//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const WeeklyWeather = require("../models/WeeklyWeather"); // Models
const Coordinates = require('../models/Coordinates');
// Console log all documents that match conditions from the collection.

module.exports = function(model, callback, filter={}){ // filter doc https://mongoosejs.com/docs/api.html#model_Model.find

	model.find(filter, (err, founded)=>{ //find and return all documents inside obj collection
	    if(err) throw err // error handling
		console.log(founded);
		callback();
	});
}