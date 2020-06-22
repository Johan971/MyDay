
const insert = require("../dbControl/insert"); // Database read module
const Trend = require('../models/Trends');
const TwitterApi = require("../getTwitter");

function compare(a, b) {

    const volA = a.tweetVolume;
    const volB = b.tweetVolume;

    let comparison = 0;

    if (volA < volB) {
        comparison = 1;
    } else if (volA > volB) {
        comparison = -1;
    }

    return comparison;
}

exports.getTwitter = function(req, res) {

    let newVal = [];

    TwitterApi.newGet((result) => {

        // sort result by tweetVolume
        result = result.sort(compare);

        for (const elt in result) { //data[0].length-1

            if (result[elt] == undefined) {
                break;
            } else if (result[elt].tweet_volume !== null) {

                // check if the trend is already in the database and update delta
                Trend.findOne({name: result[elt].name}, (err, found) => {
                    if (found) {
                        let update = {delta:result[elt].tweetVolume - found.tweetVolume};
                        Trend.findOneAndUpdate({name: result[elt].name}, update, (err, found) => {
                        });

                    } else if (result[elt] !== undefined) {
                        newVal.push(new Trend({
                            name: result[elt].name,
                            urlTwitter: result[elt].urlTwitter,
                            tweetVolume: result[elt].tweetVolume,
                        }));
                    }
                    if (elt == (result.length - 1)) {
                        console.log(newVal.length)
                        if (newVal.length == 0) {
                            Trend.find({}, (err, found) => { //find and return all documents inside obj collection
                                if (err) throw err
                                res.json(found);
                            });
                        } else {
                            for (const elt in newVal) {
                                insert(newVal[elt], () => {

                                    if (elt == (newVal.length - 1)) { // once the insertion is over

                                        Trend.find({}, (err, found) => {
                                            if (err) throw err

                                            if(found.length > 50){
                                                found = found.slice(0,10)
                                            }

                                            res.json(found);
                                        });
                                    }
                                })
                            }
                        }
                    }
                });
            }
        }
    });
    
}