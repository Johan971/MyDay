const request = require('request');
const querystring = require('querystring');
const DailyWeather = require("./Models/DailyWeather");

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getDailyWeather: (callback) => {
 
    let openWeatherParams = querystring.stringify({
        q: "Lille",
        lang: "fr",
        units: "metric",
        appid: "8d27d7288804e96ae08315da0e7570c7"
    });
    
    let apiUrl = "http://api.openweathermap.org/data/2.5/weather?" + openWeatherParams;
 
    var req = request({ 
            url : apiUrl,
            json: true
        }, function (error, response, resp) {
 
            if(!error && response.statusCode === 200){

                // Create and fullfil the schema with infos
                result = new DailyWeather({
                        temp: resp.main.temp,
                        feelsLike: resp.main.feels_like,
                        tempMin: resp.main.temp_min,
                        tempMax: resp.main.temp_max,
                        description: resp.weather[0].description, // TODO : issue here
                    });

                callback(result);
            }
        }
    );
    },
}