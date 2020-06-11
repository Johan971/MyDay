const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var weeklyWeatherSchema = new Schema({ // Create Schema
    timeStamp: Number,
    sunrise: Number,
    sunset: Number,
    cloud: Number,
    rain: Number,
    temp: {
        morning: Number,
        morningFl: Number,
        day: Number,
        dayFl: Number,
        evening: Number,
        eveningFl: Number,
        night: Number,
        nightFl: Number,
        min: Number,
        max: Number,
    },
    description: String,
    icon: String,
});

// Model
var WeeklyWeather = mongoose.model("WeeklyWeather", weeklyWeatherSchema) // Create collection model from schema
module.exports = WeeklyWeather // export model
