const request = require('request')
const querystring = require('querystring')
const News = require("./models/News")
const jwt = require ('jsonwebtoken')
const fetch = require('node-fetch')
const Twit= require('twit')
var passport = require('passport')
var Strategy = require('passport-twitter').Strategy //Oauth Authentication


//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

const APIkey= "HV3fo4SNlBMjAqGI1V1kBE1S5"
const APIkeySecret= "guFQt6rLGaTU10WQyj4DEtFLuTfazTzeH13HFMOK8Bhqi9QnSz"

const AccessToken ="1268637071830368256-h2mG0MxjT8W4ClPUbJk0V9Xb3diLVj"
const AccessTokenSecret ="W5TaWNSa09XEplbqPfNBsB3oiAmiH88RxbNdefAAiGaKC"


const Newget = ()=>{

    var trustProxy = false;
    if (process.env.DYNO) {
      // Apps on heroku are behind a trusted proxy
      trustProxy = true;
    }
    /*        TWIT = API WAPPER
    const T = new Twit({
        consumer_key: APIkey,
        consumer_secret: APIkeySecret,
        access_token: AccessToken,
        access_token_secret: AccessTokenSecret,
    })
    
    T.get('/search/tweets',{q: '#maco since:2020-04-15',count:1000}, (err,data,response)=>{
        console.log(data)
    })*/


    //======================Authentication
    // Configure the Twitter strategy for use by Passport.
    //
    // OAuth 1.0-based strategies require a `verify` function which receives the
    // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
    // user's behalf, along with the user's profile.  The function must invoke `cb`
    // with a user object, which will be set at `req.user` in route handlers after
    // authentication.
    passport.use(new Strategy({
        consumerKey: process.env['TWITTER_CONSUMER_KEY'],
        consumerSecret: process.env['TWITTER_CONSUMER_SECRET'],
        callbackURL: 'http://localhost:4200/twitter/return', //Either use defined
        proxy: trustProxy
      },
      function(token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
      }));

    
    const body = { a: 1 }
    return fetch('https://api.twitter.com/1.1/search/tweets.json',{
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'authorization': 'OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' },
        })
        .then(res => res.json())
        .then(json=>console.log(json))
    
}


Newget()
module.exports = {

    getNews: (callback) => {

        let apiParams = querystring.stringify({
            country: "fr",
            apiKey: "9177a293350d4e8088491397d3f504af"
        })

        let apiUrl = "https://newsapi.org/v2/top-headlines?" + apiParams;

        
        
    }
}