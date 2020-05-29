
const mongoose = require('mongoose');
const replace = require("../replace");
const DailyWeather = require('../models/DailyWeather');
const dailyWeatherApi = require("../getDailyWeather");

exports.getDailyWeather = function(req, res) {
  	
  	// update the daily weather and send it

  	// test location 49.4721804 1.0706788
  	dailyWeatherApi.getDailyWeather("49.4721804", "1.0706788", (result)=>{ 
  		console.log(result);
		replace(DailyWeather, result, 'dailyWeatherTable'); // update the old weather
		res.json(result);
	});

};
