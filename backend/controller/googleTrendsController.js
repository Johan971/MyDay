
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module
const CandidateInterestEvolution = require('../models/MunicipalCandidateInterestEvolution');
const googleTrendsInformationApi = require("../getGoogleTrendsInformation");
const remove = require("../dbControl/remove");



exports.getGoogleTrendsInformation = function(req, res) {


    //connectDb();

    googleTrendsInformationApi.getCandidatesInterestEvolution((result) => {

        remove(CandidateInterestEvolution, ()=>{

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over

                        CandidateInterestEvolution.find({}, (err, founded) => { //find and return all documents inside obj collection
                            if (err) throw err
                            //console.log(founded)
                            res.json(founded);
                            //mongoose.disconnect();
                        });
                    }
                })
            };
        })
    });

}