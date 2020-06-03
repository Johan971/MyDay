
module.exports = function(app){

  const weeklyWeatherController = require('../controller/weeklyWeatherController');

  app.route('/api/weeklyWeather').get(weeklyWeatherController.getWeeklyWeather);
 
};