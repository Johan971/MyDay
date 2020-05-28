
const mongoose = require('mongoose');
const replace = require("../replace");
const DailyWeather = require('../models/DailyWeather');
const dailyWeatherApi = require("../getDailyWeather");

exports.getDailyWeather = function(req, res) {
  	
  	// update the daily weather and send it
  	dailyWeatherApi.getDailyWeather((result)=>{ 
		replace(DailyWeather, result, 'dailyWeatherTable'); // update the old weather
		res.json(result);
	});

};
