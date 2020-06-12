const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

//Scheme
let TrendScheme = new Schema({
    name: String,
    urlTwitter: String,
    tweetVolume: Number,
    delta: Number
});

// Model
var Trends = mongoose.model("Trends", TrendScheme) // Create collection model from schema
module.exports = Trends // export model