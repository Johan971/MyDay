
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module
const Trend = require('../models/Trends');
const TwitterApi = require("../getTwitter");
const remove = require("../dbControl/remove");



exports.getTwitter = function(req, res) {

   
    connectDb();

    TwitterApi.newGet((result) => {
    	
        remove(Trend, ()=>{

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over

                        Trend.find({}, (err, founded) => { //find and return all documents inside obj collection
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