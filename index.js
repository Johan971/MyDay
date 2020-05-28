	

					///// Library /////
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")
const bodyParser = require('body-parser');

					///// Modules /////
const connectDb = require("./backend/connectDb") // Database connection module
const insert = require("./backend/insert") // Database insert module
const read = require("./backend/read") // Database insert module
const remove = require("./backend/remove") // Database insert module
const dailyWeatherApi = require("./backend/getDailyWeather");
const replace = require("./backend/replace")

					///// Routes /////
var dailyWeatherRoutes = require('./backend/routes/dailyWeatherRoutes');

					///// Models /////
const DailyWeather = require("./backend/models/DailyWeather"); // Models module


const app = express();
const routeur = express.Router() 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.use("/",express.static(__dirname+"/public"))
app.use("/",routeur)


dailyWeatherRoutes(app); 

app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200


//////// Test Field for the Bdd functions

var mondayWeather = new DailyWeather({
	temp: 150,
	feelsLike: 25,
	tempMin: 19,
    tempMax: 27,
    description: "Ensoleillé"
});


//insert(mondayWeather, 'dailyWeatherTable');
//remove(DailyWeather, 'dailyWeatherTable');
read(DailyWeather, 'dailyWeatherTable')
//replace(DailyWeather, mondayWeather,'dailyWeatherTable', {_id : '5ecf75287c4c8c2ce35b70e6'});

dailyWeatherApi.getDailyWeather((result)=>{ 

	//console.log(result);
	//insert(result, 'dailyWeatherTable');

});




