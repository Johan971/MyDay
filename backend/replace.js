//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./Models/DailyWeather"); // Models
const insert = require("./insert") // Database insert module
const remove = require("./remove") // Database insert module



module.exports= function(obj, newObj, dbName, filter){ // filter have to select one obj
	// get 
	//obj = read()
	remove(obj, dbName, filter);
	insert(newObj, dbName);
}