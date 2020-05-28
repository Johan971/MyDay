
module.exports = function(app){

    const vLilleController = require('../controller/vLilleController');

    app.route('/api/vLille').get(vLilleController.getAvailableVLille);

};