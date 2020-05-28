

module.exports = function(app){

  const dailyWeatherController = require('../controller/dailyWeatherController');

  app.route('/api/dailyWeather').get(dailyWeatherController.getDailyWeather);
 
};