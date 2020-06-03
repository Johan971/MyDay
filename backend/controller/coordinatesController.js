
const mongoose = require('mongoose');

const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module
const connectDb = require("../dbControl/connectDb");

const Coordinates = require('../models/Coordinates');
const WeeklyWeather = require('../models/WeeklyWeather');
const dailyWeatherApi = require("../getDailyWeather");

exports.storeCoordinates = function(req, res) {

	// TODO : store coordonates with replace

	// update weather
    dailyWeatherApi.getDailyWeather(req.body.lat, req.body.lon, (result)=>{

    	connectDb("mongodb://localhost:27017/"+'weeklyWeatherTable')

		replace(WeeklyWeather, result[0], () => {
			mongoose.disconnect();
		});
		
    });

};
