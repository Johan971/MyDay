//Library
const mongoose = require("mongoose");
const connectDb = require("./connectDb"); // Database connection module
const DailyWeather = require("./Models/DailyWeather"); // Models




module.exports= function(obj,filter,remp,dbName,opt={}){

	connectDb("mongodb://localhost:27017/"+dbName)
	console.log(filter,remp)

	obj.findOneAndReplace(filter, remp,opt,(err)=>{
		if(err) throw err 		//"_id" empeche le fonctionnement
		console.log("remplacé")

	})

}