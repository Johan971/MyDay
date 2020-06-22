

					///// Libraries /////
const mongoose = require("mongoose");
const express = require('express');
const path=require("path")
const bodyParser = require('body-parser');


					///// Routes /////
const dailyWeatherRoutes = require('./backend/routes/weeklyWeatherRoutes');
const vLilleRoutes = require('./backend/routes/vLilleRoutes');
const newsRoutes = require('./backend/routes/newsRoutes');
const krakenRoutes = require('./backend/routes/krakenRoutes');
const twitterRoutes = require('./backend/routes/twitterRoutes');
const NBAPlayerInformationRoutes = require('./backend/routes/NBAPlayerRoutes');


					///// Database Operations /////
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



					///// Internal Api Calls /////
dailyWeatherRoutes(app);
vLilleRoutes(app);
newsRoutes(app);
krakenRoutes(app);
twitterRoutes(app);
NBAPlayerInformationRoutes(app);

app.listen(4200, console.log('Listening on port 4200...')); // Starting the server on port 4200


//////// Test Field for the Bdd functions

