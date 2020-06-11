

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
const EuronextIndexInformationApi = require("./backend/getEuronextIndexInformation");

					///// Routes /////
const dailyWeatherRoutes = require('./backend/routes/weeklyWeatherRoutes');
const vLilleRoutes = require('./backend/routes/vLilleRoutes');
const coordinatesRoutes = require('./backend/routes/coordinatesRoutes');
const newsRoutes = require('./backend/routes/newsRoutes');
const krakenRoutes = require('./backend/routes/krakenRoutes');
const twitterRoutes = require('./backend/routes/twitterRoutes');
const EuronextIndexInformationRoutes = require("./backend/routes/EuronextIndexInformationRoutes");
const NBAPlayerInformationRoutes = require('./backend/routes/NBAPlayerRoutes');
const candidateInterestEvolution = require('./backend/routes/candidateInterestEvolutionRoutes');

					///// Models /////
const WeeklyWeather = require("./backend/models/WeeklyWeather"); // Models module
const vLille = require("./backend/models/vLille"); //Coordinates model
const Coordinates = require("./backend/models/Coordinates");
const News = require("./backend/models/News");
const BTCPrice = require("./backend/models/BTCPrice");

mongoose.connect("mongodb://localhost:27017/MyDay", {
	useNewUrlParser: true, // Recommended, insures support for future MongoDB drivers
	useUnifiedTopology: true // Recommended, uses new MongoDB topology engine
}).catch(error => console.log(error))

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected on app termination');
		process.exit(0);
	});
});

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
twitterRoutes(app);
EuronextIndexInformationRoutes(app);
NBAPlayerInformationRoutes(app);
candidateInterestEvolution(app);

app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200


//////// Test Field for the Bdd functions

