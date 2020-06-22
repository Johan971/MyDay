
//Making internal API to retrieve Twitter trending topics and tweet volumes per trending topic
module.exports = function(app){

    const twitterController = require('../controller/twitterController');
    app.route('/api/twitter').get(twitterController.getTwitter);


}