const request = require('request');
const querystring = require('querystring');
const vLille = require("./models/vLille");

let informationsArray = [];
//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    //Get list of all the vLille stations
    getAvailableVLille: (callback) => {

            //Setting parameters for API call URL
            let apiParams = querystring.stringify({
                apikey: "ffa359ac936aa08ca35fc56bab8ed36a1f2bcd2545e64f80faf3bca4",
            })

            //Final API call URL
            let apiUrl = "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&" + apiParams + "&q=&rows=268";

            //Making request with final URL
            let req = request({
                    url: apiUrl,
                    json: true
                }, function (error, response, resp) {

                    if (!error && response.statusCode === 200) {

                        let result = [];
                            
                        for(const elt in resp.records){
                            
                            if (resp.records[elt].fields.etat === "EN SERVICE") {

                                result.push(new vLille({
                                    name: resp.records[elt].fields.nom,
                                    adress: resp.records[elt].fields.adresse,
                                    state: resp.records[elt].fields.etat,
                                    bikeAvaliable: resp.records[elt].fields.nbvelosdispo,
                                    slotAvaliable: resp.records[elt].fields.nbplacesdisp,
                                    town: resp.records[elt].fields.commune,
                                    lat: resp.records[elt].fields.localisation[0],
                                    lon: resp.records[elt].fields.localisation[1],
                                }));
                            }
                            
                        }

                        // Create and fullfil the schema with infos
                        callback(result);
                    }
                    else{
                        console.log(apiUrl)
                    }
                }
            );
    },
}