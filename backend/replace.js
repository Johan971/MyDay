//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./models/DailyWeather"); // Models
const insert = require("./insert") // Database insert module
const remove = require("./remove") // Database insert module



module.exports= function(model, newObj, dbName, filter){ // filter have to select one obj
	remove(model, dbName, filter);
	insert(newObj, dbName);
}