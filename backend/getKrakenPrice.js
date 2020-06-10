const request = require('request');
const queryString = require('querystring');
const BTCPrice = require('./models/BTCPrice');

let date = new Date();
date.setMonth(2);
date.setUTCHours(-4);

    function getKrakenPrice(coinName, fiatName, inter, since, callback) { // https://support.kraken.com/hc/en-us/articles/201893658-Currency-pairs-available-for-trading-on-Kraken

        let apiParams = queryString.stringify({
            pair: coinName + fiatName,
            interval: inter, //240 (minutes)
            since: since //date.getTime()/1000 (seconds)
        });

        let apiUrl = "https://api.kraken.com/0/public/OHLC?" + apiParams;

        var req = request({
            url: apiUrl,
            json: true
        }, function(error, response, resp) {
            if(!error && response.statusCode === 200){
                let apiResponseString = "X" + coinName.toUpperCase() + "Z" + fiatName.toUpperCase();

                callback(resp.result[apiResponseString]);
            }
        })
    }


exports.getKraken = function (interval, since, callback) {
        getKrakenPrice("xbt", "eur", interval, since, (resp) => {
            let result = [];
            for(const elt in resp){
                result.push(new BTCPrice({
                    time: resp[elt][0],
                    priceBTC: resp[elt][4]
                }));
            }
            getKrakenPrice("eth", "eur", interval, since, (resp) => {
                for (const elt in result) {
                    result[elt].priceETH = resp[elt][4]
                }
                getKrakenPrice("xrp", "eur", interval, since, (resp) => {
    
                    for (const elt in result) {
                        result[elt].priceXRP = resp[elt][4]
                    }
                    getKrakenPrice("ltc", "eur", interval, since, (resp) => {
                        for (const elt in result) {
                            
                            result[elt].priceLTC = resp[elt][4]
                        }
                        callback(result);
                    })
                })
            })
        })
        
}