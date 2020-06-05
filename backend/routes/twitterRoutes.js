const passport=resquire('passport')
var Strategy = require('passport-twitter').Strategy



module.exports = function(app){

    const twitterController = require('../controller/twitterController');

    app.route('/api/twitter').post(twitterController.XXXXX);

};