const request = require('request');

module.exports = function(){

    let querystring = require('querystring');
    let request = require('request');
 
    let openWeatherParams = querystring.stringify({
        q: "Lille",
        lang: "fr",
        units: "metric",
        appid: "8d27d7288804e96ae08315da0e7570c7"
    });
    
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?" + openWeatherParams;
 
    request({   
            url : apiUrl,
            json: true
        }, function (error, response, resp) {
 
            if(!error && response.statusCode === 200){
                let text = resp.main.temp;
                console.log(resp);
            }
        }
    );
}