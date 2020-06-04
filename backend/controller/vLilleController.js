
const mongoose = require('mongoose');

const connectDb = require("../dbControl/connectDb");
const remove = require("../dbControl/remove");
const insert = require("../dbControl/insert");
const read = require("../dbControl/read");

const vLille = require('../models/vLille');
const vLilleApi = require("../getAvailableVLille");

exports.getVLille = function(req, res) {

    connectDb();

    vLilleApi.getAvailableVLille((result) => {

        remove(vLille, () => {
            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length-1)) { // once the insertion is over

                        vLille.find({}, (err, founded) => { //find and return all documents inside obj collection
                            if (err) throw err 
                            //console.log(founded)
                            res.json(founded);
                            mongoose.disconnect();
                        });
                    }
                })
            };
        });
    });




};
