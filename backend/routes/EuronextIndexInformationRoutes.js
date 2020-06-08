
module.exports = function(app){

    const EuronextIndexInformationController = require('./EuronextIndexInformationRoutes');

    app.route('/api/EuronextIndexInformation').get(EuronextIndexInformationController.getEuronextIndexInformation());

};