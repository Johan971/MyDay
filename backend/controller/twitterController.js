
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module
const Trend = require('../models/Trends');
const TwitterApi = require("../getTwitter");
const remove = require("../dbControl/remove");

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

   
    /*
    for (const elt in dataT.trends) { //data[0].length-1

        if (dataT.trends[elt] == undefined) {
            console.log("breaked")
            break;
        } else if (dataT.trends[elt].tweet_volume !== null) {

            // check if the trend is already in the database and update delta
            //console.log(dataT.trends[elt].name)
            Trend.findOne({
                name: dataT.trends[elt].name
            }, (err, founded) => {
                //console.log(founded)

                if (founded) {

                    var update = dataT.trends[elt].tweet_volume - founded.tweetVolume;
                    Trend.findOneAndUpdate({
                        name: dataT.trends[elt].name
                    }, update, (err, founded) => {

                    });
                } else if (dataT.trends[elt] != undefined) {
                    //console.log(dataT.trends[elt])
                    result.push(new Trend({
                        name: dataT.trends[elt].name,
                        urlTwitter: dataT.trends[elt].url,
                        tweetVolume: dataT.trends[elt].tweet_volume
                    }));
                }
                if (elt == 49) {
                    res(result)
                    //callback(result)
                }
            });
        }
    }*/

    var newVal = [];

    TwitterApi.newGet((result) => {

        // sort result by tweetVolume
        result = result.sort(compare);

        console.log(result.length)

        for (const elt in result) { //data[0].length-1

            if (result[elt] == undefined) {
                console.log("breaked")
                break;
            } else if (result[elt].tweet_volume !== null) {

                // check if the trend is already in the database and update delta
                //console.log(dataT.trends[elt].name)
                Trend.findOne({name: result[elt].name}, (err, founded) => {
                    //console.log(founded)

                    if (founded) {

                        var update = {delta:result[elt].tweetVolume - founded.tweetVolume};
                        Trend.findOneAndUpdate({name: result[elt].name}, update, (err, founded) => {
                            //console.log(update)
                        });

                    } else if (result[elt] != undefined) {
                        //console.log(result[elt])
                        newVal.push(new Trend({
                            name: result[elt].name,
                            urlTwitter: result[elt].urlTwitter,
                            tweetVolume: result[elt].tweetVolume,
                        }));
                    }
                    if (elt == (result.length - 1)) {
                        //res(result)
                        //callback(result)
                        console.log(newVal.length)
                        if (newVal.length == 0) {
                            Trend.find({}, (err, founded) => { //find and return all documents inside obj collection
                                if (err) throw err
                                //console.log(founded)
                                res.json(founded);
                            });
                        } else {
                            for (const elt in newVal) {
                                //console.log(newVal[elt])
                                insert(newVal[elt], () => {

                                    if (elt == (newVal.length - 1)) { // once the insertion is over

                                        Trend.find({}, (err, founded) => {
                                            if (err) throw err
                                            //console.log(founded)

                                            if(founded.length > 50){
                                                founded = founded.slice(0,10)
                                            }

                                            res.json(founded);
                                        });
                                    }
                                })
                            };
                        }
                    }
                });
            }
        }
    	
        /*remove(Trend, ()=>{
            console.log(newVal)
            if(newVal.length == 0){
                Trend.find({}, (err, founded) => { //find and return all documents inside obj collection
                    if (err) throw err
                    //console.log(founded)
                    res.json(founded);
                });
            }
            else{
                for (const elt in newVal) {
                    insert(result[elt], () => {
                        
                        if (elt == (result.length - 1)) { // once the insertion is over

                            Trend.find({}, (err, founded) => { //find and return all documents inside obj collection
                                if (err) throw err
                                //console.log(founded)
                                res.json(founded);
                            });
                        }
                    })
                };
            }
        })*/
    });
    
}