
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module
const News = require('../models/News');
const newsApi = require("../getNews");
const remove = require("../dbControl/remove");



exports.getNews = function(req, res) {

    
    connectDb();

    newsApi.getNews((result) => {

        remove(News, ()=>{

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over

                        News.find({}, (err, founded) => { //find and return all documents inside obj collection
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