	

					///// Library /////
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")
const bodyParser = require('body-parser');

					///// Modules /////
const connectDb = require("./backend/connectDb") // Database connection module
const insert = require("./backend/insert") // Database insert module
const read = require("./backend/read") // Database read module
const remove = require("./backend/remove") // Database remove module
const dailyWeatherApi = require("./backend/getDailyWeather");
const replace = require("./backend/replace");
const vLilleApi = require("./backend/getAvailableVLille");
const coordinatesApi = require("./backend/getCoordinates");

					///// Routes /////
const dailyWeatherRoutes = require('./backend/routes/dailyWeatherRoutes');
const vLilleRoutes = require('./backend/routes/vLilleRoutes');
const coordinatesRoutes = require('./backend/routes/coordinatesRoutes');

					///// Models /////
const DailyWeather = require("./backend/models/DailyWeather"); // Models module
const vLille = require("./backend/models/vLille"); //Coordinates model
const Coordinates = require("./backend/models/Coordinates");


const app = express();
const routeur = express.Router();
let coords= [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeur.get("/",(req,res)=>{
	res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.use("/",express.static(__dirname+"/public"))
app.use("/",routeur)


dailyWeatherRoutes(app);
coordinatesRoutes(app);
vLilleRoutes(app);

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

//replace(DailyWeather, mondayWeather,'dailyWeatherTable', {_id : '5ecf75287c4c8c2ce35b70e6'});

read(vLille, 'vLilleTable');
read(DailyWeather, 'dailyWeatherTable')
read(Coordinates, 'coordinatesTables');

