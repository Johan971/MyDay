const request = require('request');
const querystring = require('querystring');
const Coordinates = require("./models/Coordinates");

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getCoordinates:  (city, callback) => {

        let addressDataParams = querystring.stringify({
            q: city,
        });


        let apiUrl = "http://api-adresse.data.gouv.fr/search/?" + addressDataParams;

        var req = request({
                url : apiUrl,
                json: true
            }, function (error, response, resp) {

                if(!error && response.statusCode === 200){

                    // Create and fullfil the schema with infos
                    result = new Coordinates({
                        lat: resp.features[0].geometry.coordinates[1],
                        lon: resp.features[0].geometry.coordinates[0]
                    });

                    console.log(result);

                    callback(result);
                }
            }
        );
    },
}