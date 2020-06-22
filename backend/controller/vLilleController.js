
const remove = require("../dbControl/remove");
const insert = require("../dbControl/insert");

const vLille = require('../models/vLille');
const vLilleApi = require("../getAvailableVLille");

exports.getVLille = function(req, res) {

    vLilleApi.getAvailableVLille((result) => {

        remove(vLille, () => {
            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length-1)) { // once the insertion is over

                        vLille.find({}, (err, found) => { //find and return all documents inside obj collection
                            if (err) throw err
                            res.json(found);
                        });
                    }
                })
            };
        });
    });




};
