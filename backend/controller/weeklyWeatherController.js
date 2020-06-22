
const WeeklyWeather = require('../models/WeeklyWeather');

exports.getWeeklyWeather = function(req, res) {

	WeeklyWeather.find({}, (err, found) => { //find and return all documents inside obj collection
		if (err) throw err // error handling
		res.json(found);
	});

};
