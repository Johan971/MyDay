const request = require('request');
const querystring = require('querystring');
const NBAPlayer = require("./models/NBAPlayer");
let parseString = require('xml2js').parseString;

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getNBAPlayerInformation: (callback) => {

        let apiUrl = "https://www.fantasybasketballnerd.com/service/draft-rankings";

        var req = request({
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

                    parseString(resp, function(err, jSonResp){

                        let stringifiedJSonResp = JSON.stringify(jSonResp);
                        
                        let result = [];

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