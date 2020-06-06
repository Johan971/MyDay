const passport=require('passport')
var Strategy = require('passport-twitter').Strategy



module.exports = function(app){

    const twitterController = require('../controller/twitterController');


    
    app.get('/auth/twitter', passport.authenticate('twitter')
    
    /*app.get('/auth/twitter/callback',
      passport.authenticate('twitter', { successRedirect: '/',
                                         failureRedirect: '/login' }),
      function(req,res){
      	console.log("succesful authentication",res) //rres.JSON

      }*/

      )
    app.get(twitterController.newGet)


}