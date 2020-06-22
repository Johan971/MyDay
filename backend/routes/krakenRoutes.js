
//Making internal API to retrieve Kraken information
module.exports = function (app) {

    const krakenController = require('../controller/krakenController');

    app.route('/api/kraken').get(krakenController.getKraken);

};