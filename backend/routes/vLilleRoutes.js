
//Making internal API to retrieve vLille stations
module.exports = function(app){

    const vLilleController = require('../controller/vLilleController');

    app.route('/api/vLille').get(vLilleController.getVLille);
};