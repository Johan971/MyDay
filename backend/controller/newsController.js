
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
    remove(News, ()=>{
    	newsApi.getNews((result) => {
    	    result.forEach(elmnt=>insert(elmnt, ()=>{console.log("Inserted")}))
    	})
    })
    
    

}