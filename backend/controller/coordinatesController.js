
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

    	connectDb("mongodb://localhost:27017/"+'dailyWeatherTable')

		replace(DailyWeather, result, () => {
			mongoose.disconnect();
		});
		
    });

};
