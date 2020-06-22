
const insert = require("../dbControl/insert"); // Database read module
const NBAPlayer = require('../models/NBAPlayer');
const NBAPlayerInformationApi = require("../getNBAPlayerInformation");
const remove = require("../dbControl/remove");



exports.getNBAPlayerInformation = function(req, res) {

    NBAPlayerInformationApi.getNBAPlayerInformation((result) => {

        remove(NBAPlayer, ()=>{

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over
                        NBAPlayer.find({}, (err, found) => { //find and return all documents inside obj collection
                            if (err) throw err
                            res.json(found);
                        });
                    }
                })
            }
        })
    });

}