const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var dailyWeatherSchema = new Schema({ // Create Schema
    temp: Number, // Absolute temperature
    feelsLike: Number,
    tempMin: Number,
    tempMax: Number,
})

// Model
var DailyWeather = mongoose.model("Weather", dailyWeatherSchema) // Create collection model from schema
module.exports = DailyWeather // export model