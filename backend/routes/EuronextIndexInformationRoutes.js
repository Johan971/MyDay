
module.exports = function(app){

    const EuronextIndexInformationController = require('../controller/EuronextIndexInformationController');

    app.route('/api/EuronextIndexInformation').get(EuronextIndexInformationController.getEuronextIndexInformation);

};