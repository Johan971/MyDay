	
					///// Library /////
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")

					///// Modules /////
const connectDb = require("./backend/connectDb") // Database connection module
const insert = require("./backend/insert") // Database insert module
const read = require("./backend/read") // Database insert module
const remove = require("./backend/remove") // Database insert module
const dailyWeatherApi = require("./backend/getDailyWeather");

					///// Models /////
const DailyWeather = require("./backend/Models/DailyWeather"); // Models module


const app = express();
const routeur = express.Router() 

routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.use("/",express.static(__dirname+"/public"))
app.use("/",routeur)
app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200



// Insert Test
var mondayWeather = new DailyWeather({
	temp: 15,
	feelsLike: 25,
	tempMin: 19,
    tempMax: 27,
    description: "Ensoleillé"
});

//insert(mondayWeather, 'dailyWeatherTable');
//remove(DailyWeather, 'dailyWeatherTable');

dailyWeatherApi.getDailyWeather(function(result){ 
	//insert(result, 'dailyWeatherTable');
	console.log(result);
});