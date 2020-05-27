const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var dailyWeatherSchema = new Schema({ // Create Schema
    temp: Number, // Absolute temperature
    feelLike: Number,
    tempMin: Number,
    tempMax: Number,
    description: String // Ex : nuageux
})

// Model
var DailyWeather = mongoose.model("DailyWeather", dailyWeatherSchema) // Create collection model from schema
module.exports = DailyWeather // export model