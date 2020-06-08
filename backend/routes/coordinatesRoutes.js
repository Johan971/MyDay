
module.exports = function(app){

    const coordinatesController = require('../controller/coordinatesController');

    app.route('/api/coordinates').post(coordinatesController.storeCoordinates);
    app.route('/api/coordinates').get(coordinatesController.getCoordinates);

};