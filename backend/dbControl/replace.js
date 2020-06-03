//Library
const mongoose = require("mongoose");

const connectDb = require("./connectDb");
const remove = require("./remove");
const read = require("./read");
const insert = require("./insert");

const DailyWeather = require("../models/DailyWeather"); // Models
const util = require("util");

module.exports= function(model, newObj, callback, filter = {}){ // filter have to select one obj
	remove(DailyWeather, () => {
		insert(newObj, ()=>{
			//read(DailyWeather, () =>{

			//});
		});
	}, filter);
}