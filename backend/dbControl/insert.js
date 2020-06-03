//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const WeeklyWeather = require("../models/WeeklyWeather"); // Model
const Coordinates = require('../models/Coordinates');

module.exports = function(model, callback) {

	model.save(err => { // save document inside collection
	    if(err) throw err // error handling
	    console.log("Inserted")
	    callback();
	})

}
