
//Making internal API to retrieve weather information
module.exports = function(app){

  const weeklyWeatherController = require('../controller/weeklyWeatherController');

  app.route('/api/weeklyWeather').get(weeklyWeatherController.getWeeklyWeather);
 
};