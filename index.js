

					///// Library /////
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")
const bodyParser = require('body-parser');

					///// Modules /////
const connectDb = require("./backend/dbControl/connectDb") // Database connection module
const insert = require("./backend/dbControl/insert") // Database insert module
const read = require("./backend/dbControl/read") // Database read module
const remove = require("./backend/dbControl/remove") // Database remove module
const replace = require("./backend/dbControl/replace");

const dailyWeatherApi = require("./backend/getWeeklyWeather");
const vLilleApi = require("./backend/getAvailableVLille");
const coordinatesApi = require("./backend/getCoordinates");
const newsApi = require("./backend/getNews");


					///// Routes /////
const dailyWeatherRoutes = require('./backend/routes/weeklyWeatherRoutes');
const vLilleRoutes = require('./backend/routes/vLilleRoutes');
const coordinatesRoutes = require('./backend/routes/coordinatesRoutes');
const newsRoutes = require('./backend/routes/newsRoutes');
const krakenRoutes = require('./backend/routes/krakenRoutes');
//const twitterRoutes = require('./backend/routes/twitterRoutes')

					///// Models /////
const WeeklyWeather = require("./backend/models/WeeklyWeather"); // Models module
const vLille = require("./backend/models/vLille"); //Coordinates model
const Coordinates = require("./backend/models/Coordinates");
const News = require("./backend/models/News");
const BTCPrice = require("./backend/models/BTCPrice");



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
vLilleRoutes(app);
coordinatesRoutes(app);
newsRoutes(app);
krakenRoutes(app);
//twitterRoutes(app)

app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200


//////// Test Field for the Bdd functions

