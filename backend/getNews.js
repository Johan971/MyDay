const request = require('request');
const querystring = require('querystring');
const News = require("./models/News");
const fs = require('fs');

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {
    getNews: (callback) => {

        let rawData = fs.readFileSync('./backend/config.json');
        let config = JSON.parse(rawData);

        let apiParams = querystring.stringify({
            country: "fr",
            apiKey: config.news.key
        })

        let apiUrl = "https://newsapi.org/v2/top-headlines?" + apiParams;

        var req = request({
                url: apiUrl,
                json: true
            }, function (error, response, resp) {

                if (!error && resp.status == "ok") {
                    result=[]
                    for(let i = 0; i < resp.articles.length; i++) {
                        result.push(new News({
                            source: resp.articles[i].source.name,
                            author: resp.articles[i].author,
                            title: resp.articles[i].title,
                            description: resp.articles[i].description,
                            content: resp.articles[i].content,
                            imageUrl:resp.articles[i].urlToImage,
                            articleUrl: resp.articles[i].url
                        }))
                    }

                    //console.log(result)
                    callback(result)
                }
            }
        );
    },
}