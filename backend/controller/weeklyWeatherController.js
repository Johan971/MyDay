
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const WeeklyWeather = require('../models/WeeklyWeather');
const weeklyWeatherApi = require("../getWeeklyWeather");

exports.getWeeklyWeather = function(req, res) {
  	

	connectDb("mongodb://localhost:27017/" + 'weeklyWeatherTable');

	WeeklyWeather.find({}, (err, founded) => { //find and return all documents inside obj collection
		if (err) throw err // error handling
		res.json(founded);
		mongoose.disconnect();
	});

};
