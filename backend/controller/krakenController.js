const mongoose = require('mongoose');

const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); 
const insert = require("../dbControl/insert");
const remove = require("../dbControl/remove");

const BTCPrice = require('../models/BTCPrice');
const krakenAPI = require("../getKrakenPrice");


exports.getKraken = function (req, res) {

    connectDb();

    krakenAPI.getKraken((result) => {

        remove(BTCPrice, () => {

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
        })
    });

}