
const insert = require("../dbControl/insert"); // Database read module
const News = require('../models/News');
const newsApi = require("../getNews");
const remove = require("../dbControl/remove");

exports.getNews = function(req, res) {

    newsApi.getNews((result) => {

        remove(News, ()=>{

            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == (result.length - 1)) { // once the insertion is over

                        News.find({}, (err, found) => { //find and return all documents inside obj collection
                            if (err) throw err
                            res.json(found);
                        });
                    }
                })
            };
        })
    });
    
}