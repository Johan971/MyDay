
module.exports = function(app){

    const googleTrendsController = require('../controller/googleTrendsController');

    app.route('/api/googleTrends').get(googleTrendsController.getGoogleTrendsInformation);

};