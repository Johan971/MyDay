
const mongoose = require('mongoose');

const replace = require("../replace");
const read = require("../read"); // Database read module
const insert = require("../insert"); // Database read module
const connectDb = require("../connectDb");

const Coordinates = require('../models/Coordinates');
const DailyWeather = require('../models/DailyWeather');
const dailyWeatherApi = require("../getDailyWeather");

exports.storeCoordinates = function(req, res) {

	// TODO : store coordonates with replace

	// update weather
    dailyWeatherApi.getDailyWeather(req.body.lat, req.body.lon, (result)=>{
		//replace(DailyWeather, result, 'dailyWeatherTable');
		//insert(result, 'dailyWeatherTable');
		//read(DailyWeather, 'dailyWeatherTable');

	connectDb("mongodb://localhost:27017/"+'dailyWeatherTable') // Connect to database

		DailyWeather.deleteMany({}, (err,doc)=>{ 
		    if(err){
		    	throw err; // error handling
		    	mongoose.disconnect();
		    } 
		    else if (doc){
		    	console.log("Removed");
		    	//mongoose.disconnect();
		    }
		    result.save(err => { // save document inside collection
			    if(err) throw err;
			    else {
			    	console.log("Document inserted");
			    	//mongoose.disconnect();
			    }
		    	DailyWeather.find({}, (err, founded)=>{ //find and return all documents inside obj collection
				    if(err) throw err; // error handling
				    console.log(founded);
				    mongoose.disconnect();
				});
			});
		});
    });

};
