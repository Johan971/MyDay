const mongoose = require('mongoose');

const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); 
const insert = require("../dbControl/insert");
const remove = require("../dbControl/remove");

const BTCPrice = require('../models/BTCPrice');
const krakenAPI = require("../getKrakenPrice");


exports.updateKraken = function (req, res) {



    connectDb();

    krakenAPI.getKraken((result) => {

        remove(BTCPrice, () => {

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over
                        //mongoose.disconnect();
                    }
                })
            };
        })
    });

}

exports.getKraken = function (req, res) {

    connectDb();
    currentTimeStamp = Date.now();
    var march = new Date("02 March 2020 00:00:00");

    // test if data are too old with one update each 4 hours (14400)
    BTCPrice.find((err, maxFounded) => { // si il n'y a rien prendre since = il y a 2 mois

        BTCPrice.find((err, minFounded) => {

            //console.log(minFounded[0].time);
            //console.log(march.getTime() / 1000);

            if (minFounded[0].time > march.getTime()/1000) {

                console.log("Updating data since March 2020");

                krakenAPI.getKraken(240, march.getTime()/1000, (result) => {
                    remove(BTCPrice, () => {
                        for (const elt in result) {
                            insert(result[elt], () => {
                                if (elt == (result.length - 1)) { // once the insertion is over
                                    BTCPrice.find({}, (err, founded) => { //find and return all documents inside obj collection
                                        if (err) throw err
                                        console.log(founded.length)
                                        res.json(founded);
                                        mongoose.disconnect();
                                    });
                                }
                            })
                        }
                    })
                });
            }
            else if (currentTimeStamp/1000 - maxFounded[0].time > 14400){ // then update

                console.log("Quick update : last update " + new Date(maxFounded[0].time*1000));

                krakenAPI.getKraken(240, maxFounded[0].time, (result) => {

                    for (const elt in result) {
                        insert(result[elt], () => {
                            if (elt == (result.length - 1)) { // once the insertion is over
                                BTCPrice.find({}, (err, founded) => { //find and return all documents inside obj collection
                                    if (err) throw err
                                    //console.log(founded)
                                    res.json(founded);
                                    mongoose.disconnect();
                                });
                            }
                        })
                    };
                });

            }
            else{

                console.log("No need to update data, last update : " + new Date(maxFounded[0].time*1000));

                BTCPrice.find({}, (err, founded) => { //find and return all documents inside obj collection
                    if (err) throw err
                    //console.log(founded)
                    res.json(founded);
                    mongoose.disconnect();
                });
            }

        }).sort({time: 1}).limit(1);

    }).sort({ time: -1 }).limit(1);

    

}