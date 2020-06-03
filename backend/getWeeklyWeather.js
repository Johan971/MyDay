const request = require('request');
const querystring = require('querystring');
const WeeklyWeather = require("./models/WeeklyWeather");

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getWeeklyWeather: (la, lo, callback) => {
 
    let openWeatherParams = querystring.stringify({
        lat: la,
        lon: lo,
        lang: "fr",
        units: "metric",
        exclude: "hourly",
        appid: "8d27d7288804e96ae08315da0e7570c7"
    });

    let apiUrl = "http://api.openweathermap.org/data/2.5/onecall?" + openWeatherParams;
 
    var req = request({ 
            url : apiUrl,
            json: true
        }, function (error, response, resp) {

            if(error){
                console.log(error.code)
            }
 
            if(!error && response.statusCode === 200){

                //console.log(resp.current.weather[0].description);
                //console.log(resp.daily[0].temp.morn);

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
                    }));
                }
                
                callback(result);
            }
        }
    );
    }
}