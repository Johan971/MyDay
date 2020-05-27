// Library
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")

const connectDb = require("./backend/connectDb") // Database connection module
const insert = require("./backend/insert") // Database insert module
const read = require("./backend/read") // Database insert module
const remove = require("./backend/remove") // Database insert module
const DailyWeather = require("./backend/DailyWeather"); // Models module
const getDailyWeather = require("./backend/getDailyWeather");


const app = express();
const routeur=express.Router() 


routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.use("/",express.static(__dirname+"/public"))
app.use("/",routeur)
app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200

// Insert
var mondayWeather = new DailyWeather({
	temp: 15,
	feelLike: 25,
	tempMin: 19,
    tempMax: 27,
    description: "Ensoleillé"
});

//insert(mondayWeather, 'dailyWeatherTable');

remove(DailyWeather, 'dailyWeatherTable');

read(DailyWeather, 'dailyWeatherTable');

//getDailyWeather();