

module.exports = function(app){

    const twitterController = require('../controller/twitterController');
    app.route('/api/twitter').get(twitterController.getTwitter);


}