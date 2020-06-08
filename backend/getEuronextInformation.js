const request = require('request');
const querystring = require('querystring');
const EuronextIndexInformation = require("./models/EuronextIndexInformation");

//////// WARNING : This is an asyc function working with callback ////////
// For more infos/understanding : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

module.exports = {

    getEuronextIndexInformation: (index, callback) => {

        let EuronextParams = querystring.stringify({
            code: index,
            codification: "ISIN",
            exchCode: "XPar",
            authKey: "256f0720127269acfcb390b5adef10c242469c41afd08426744324bee3e2d75a"
        });

        let apiUrl = "http://gateway.euronest.com/api/instrumentDetail?" + openWeatherParams;

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

                    let result = new EuronextIndexInformation({
                        curPrice: resp.instr.currinstrSess.lastPx,
                        highestPrice: resp.instr.perf[1].highPx,
                        lowestPrice: resp.instr.perf[1].lowPx,
                        priceDifferenceSinceLastClose: ((resp.instr.currinstrSession.lastPx / resp.instr.currinstrSess.closPx) - 1) * 100
                    })

                    callback(result);
                }
            }
        );
    }
}