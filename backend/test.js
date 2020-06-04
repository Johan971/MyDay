const request = require('request');
const querystring = require('querystring');
const News = require("./models/News");

let informationArray = [];
//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getNews: (callback) => {

        let apiParams = querystring.stringify({
            country: "fr",
            apiKey: "9177a293350d4e8088491397d3f504af" //Other : 9daea0d2b0244225bdac77c7ed0c2a30
        })

        let apiUrl = "https://newsapi.org/v2/top-headlines?" + apiParams;

        var req = request({
                url: apiUrl,
                json: true
            }, function (error, response, resp) {

                if (!error && response.statusCode === 200) {
                    for(let i = 0; i < resp.articles.length; i++) {
                            informationArray.push("Provenance : " + resp.articles[i].source.name, "Date de parution : " + resp.articles[i].publishedAt , "Titre : " + resp.articles[i].title, "Description : " + resp.articles[i].description, "URL : " + resp.articles[i].url, "\n");
                            result = new News({
                                news: informationArray
                            })
                    }
                    // Create and fulfill the schema with infos
                    callback(result);
                }
            }
        );
    },
}