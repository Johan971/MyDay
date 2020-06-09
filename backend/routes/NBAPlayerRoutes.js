
module.exports = function(app){

    const NBAPlayerController = require('../controller/NBAPlayerController');

    app.route('/api/nba').get(NBAPlayerController.getNBAPlayerInformation);

};