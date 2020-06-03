//Library
const mongoose = require("mongoose");

const connectDb = require("./connectDb");
const remove = require("./remove");
const read = require("./read");
const insert = require("./insert");

const WeeklyWeather = require("../models/WeeklyWeather"); // Model
const Coordinates = require('../models/Coordinates');

module.exports= function(model, newObj, callback, filter = {}){ // filter have to select one obj
	remove(model, () => {
		insert(newObj, ()=>{
			read(model, () =>{

			});
		});
	}, filter);
}
