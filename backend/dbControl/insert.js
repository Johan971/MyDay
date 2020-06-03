//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("../models/DailyWeather"); // Model


module.exports = function(model, callback) {

	model.save(err => { // save document inside collection
	    if(err) throw err // error handling
	    console.log("Inserted")
	    callback();
	})

}