const request = require('request');
const querystring = require('querystring');
const WeeklyWeather = require("./models/WeeklyWeather");
const fs = require('fs');

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    //Get weather information for given coordinates
    getWeeklyWeather: (la, lo, callback) => {

        //Setting path of the config file to retrieve API tokens and keys
        let rawData = fs.readFileSync('./backend/config.json');
        let config = JSON.parse(rawData);

        //Setting parameters for API call URL
        let openWeatherParams = querystring.stringify({
            lat: la,
            lon: lo,
            lang: "fr",
            units: "metric",
            exclude: "hourly",
            appid: config.weather.key
        });

        //Final API call URL
        let apiUrl = "http://api.openweathermap.org/data/2.5/onecall?" + openWeatherParams;

        //Making request with final URL
        let req = request({
                url : apiUrl,
                json: true
            }, function (error, response, resp) {

                if(error){
                    console.log(error.code)
                }

                if(!error && response.statusCode === 200){
                    let result = [];

                    for (const i in resp.daily) {
                        result.push(new WeeklyWeather({
                            timeStamp: resp.daily[i].dt,
                            sunrise: resp.daily[i].sunrise,
                            sunset: resp.daily[i].sunset,
                            cloud: resp.daily[i].cloud,
                            temp: {
                                morning: resp.daily[i].temp.morn,
                                morningFl: resp.daily[i].feels_like.morn,
                                day: resp.daily[i].temp.day,
                                dayFl: resp.daily[i].feels_like.day,
                                evening: resp.daily[i].temp.eve,
                                eveningFl: resp.daily[i].feels_like.eve,
                                night: resp.daily[i].temp.night,
                                nightFl: resp.daily[i].feels_like.night,
                            },
                            description: resp.daily[i].weather[0].description,
                            icon: resp.daily[i].weather[0].icon,

                        }));
                    }
                    callback(result);
                }
            }
        );
    }
}
