const insert = require("../dbControl/insert");
const remove = require("../dbControl/remove");

const BTCPrice = require('../models/BTCPrice');
const krakenAPI = require("../getKrakenPrice");

exports.getKraken = function (req, res) {
    let currentTimeStamp = Date.now();
    let firstMarch = new Date("01 March 2020 00:00:00");
    let twoMarch = new Date("02 March 2020 00:00:00");

    // test if data are too old with one update each 4 hours (14400)
    BTCPrice.find((err, maxfound) => { // si il n'y a rien prendre since = il y a 2 mois

        BTCPrice.find((err, minfound) => {

            if (minfound.length == 0 || minfound[0].time > twoMarch.getTime() / 1000) {

                console.log("Updating data since March 2020");

                krakenAPI.getKraken(240, firstMarch.getTime()/1000, (result) => {
                    remove(BTCPrice, () => {
                        for (const elt in result) {
                            insert(result[elt], () => {
                                if (elt == (result.length - 1)) { // once the insertion is over
                                    BTCPrice.find({}, (err, found) => { //find and return all documents inside obj collection
                                        if (err) throw err
                                        res.json(found);
                                    });
                                }
                            })
                        }
                    })
                });
            }
            else if (currentTimeStamp/1000 - maxfound[0].time > 14400){ // then update

                console.log("Quick update : last update " + new Date(maxfound[0].time*1000));

                krakenAPI.getKraken(240, maxfound[0].time, (result) => {

                    for (const elt in result) {
                        insert(result[elt], () => {
                            if (elt == (result.length - 1)) { // once the insertion is over
                                BTCPrice.find({}, (err, found) => { //find and return all documents inside obj collection
                                    if (err) throw err
                                    res.json(found);
                                });
                            }
                        })
                    }
                });

            }
            else{

                console.log("No need to update data, last update : " + new Date(maxfound[0].time*1000));

                BTCPrice.find({}, (err, found) => { //find and return all documents inside obj collection
                    if (err) throw err
                    res.json(found);
                });
            }

        }).sort({time: 1}).limit(1);

    }).sort({ time: -1 }).limit(1);

    

}