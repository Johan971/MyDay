const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var dailyWeatherSchema = new Schema({ // Create Schema
    timeStamp: Number,
    sunrise: Number,
    sunset: Number,
    cloud: Number,
    temp: Number,
    feelsLike: Number,
    description: String,
})

// Model
var DailyWeather = mongoose.model("Weather", dailyWeatherSchema) // Create collection model from schema
module.exports = DailyWeather // export model