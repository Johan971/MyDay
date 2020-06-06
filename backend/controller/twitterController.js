
const mongoose = require('mongoose');

const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); 
const remove = require("../dbControl/remove"); 
const connectDb = require("../dbControl/connectDb");


const twitterApi = require("../getTwitter");

exports.newGet = function(req, res) {

	//connectDb()

    twitterApi.newGet((result)=>{
    	console.log("test: ",result)
		
    })

}
