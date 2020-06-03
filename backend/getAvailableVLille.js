const request = require('request');
const querystring = require('querystring');
const vLille = require("./models/vLille");

let informationsArray = [];
//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getAvailableVLille: (callback) => {

            let apiParams = querystring.stringify({
                apikey: "ffa359ac936aa08ca35fc56bab8ed36a1f2bcd2545e64f80faf3bca4"
            })

            let apiUrl = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&" + apiParams;

            var req = request({
                    url: apiUrl,
                    json: true
                }, function (error, response, resp) {

                    if (!error && response.statusCode === 200) {
                        for(let i = 0; i < resp.records.length; i++) {
                            if (resp.records[0].fields.etat === "EN SERVICE") {
                                informationsArray.push({"Adresse ":  resp.records[i].fields.adresse, "Nombre de vélos disponibles": resp.records[i].fields.nbvelosdispo, "Nombre de places disponibles ":resp.records[i].fields.nbplacesdispo});
                                //console.log("Adresse : " + resp.records[0].fields.adresse, "Nombre de vélos disponibles : " + resp.records[0].fields.nbvelosdispo, "Nombre de places disponibles : " + resp.records[0].fields.nbplacesdispo, "\n");
                                result = new vLille({
                                    activeStations: informationsArray
                                })
                            }
                        }
                        // Create and fullfil the schema with infos
                        callback(result);
                    }
                }
            );
    },
}