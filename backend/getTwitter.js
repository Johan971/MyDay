const request = require('request')
const querystring = require('querystring')
const News = require("./models/News")
const jwt = require ('jsonwebtoken')
const fetch = require('node-fetch')

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

const APIkey: "rolUl6pd4rgDrhiXslRLDV9TY"
const APIkeySecret: "DiBNF8gvl2MJALPEdN6b6RWdltFP8u8OPJTbn2doPo3L57rG3Q"

const AccessToken :"1268637071830368256-TL9jhp9z3pEp5wb9u5RnVJbjW1Y4mJ"
const AccessTokenSecret :"H4IPVUU9RRUFBaccRfbfJPDJUcGvy496y9QrsI9v1Za5M"


const Newget = ()=>{

    const body = { a: 1 }

    return fetch('https://api.twitter.com/1.1/statuses/update.json?status=Hello%20world',{
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'authorization': 'OAuth oauth_consumer_key="CONSUMER_API_KEY", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="OAUTH_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="OAUTH_TIMESTAMP", oauth_token="ACCESS_TOKEN", oauth_version="1.0"' },
        })
        .then(res => res.json())
        .then(json=>console.log(json))
}



module.exports = {

    getNews: (callback) => {

        let apiParams = querystring.stringify({
            country: "fr",
            apiKey: "9177a293350d4e8088491397d3f504af"
        })

        let apiUrl = "https://newsapi.org/v2/top-headlines?" + apiParams;

        
        
    }
}