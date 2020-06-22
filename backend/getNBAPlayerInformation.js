const request = require('request');
const querystring = require('querystring');
const NBAPlayer = require("./models/NBAPlayer");
let parseString = require('xml2js').parseString;

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    //Get the current 30 best NBA players
    getNBAPlayerInformation: (callback) => {

        //Final API call URL
        let apiUrl = "https://www.fantasybasketballnerd.com/service/draft-rankings";

        //Making request with URL and adding headers information
        let req = request({
                url : apiUrl,
                json: true,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }, function (error, response, resp) {

                if(error){
                    console.log(error.code)
                }

                if(!error && response.statusCode === 200){

                    //The request returns an XML file, in order to use it we first need to convert it to JSON
                    parseString(resp, function(err, jSonResp){

                        let stringifiedJSonResp = JSON.stringify(jSonResp);
                        
                        let result = [];

                        //Now we can retrieve the data from the JSON
                        for(let i = 0; i < 30; i++){
                            result.push(new NBAPlayer({
                                playerName: JSON.stringify(jSonResp.FantasyBasketballNerd.Player[i].name),
                                playerTeam: JSON.stringify(jSonResp.FantasyBasketballNerd.Player[i].team),
                                playerPosition: JSON.stringify(jSonResp.FantasyBasketballNerd.Player[i].position),
                                playerRank: JSON.stringify(jSonResp.FantasyBasketballNerd.Player[i].rank)
                            }));
                        }
                        callback(result);
                    });
                }
            }
        );
    }
}