const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var vLilleScheme = new Schema({
     name: String,
     adress: String,
     state: String,
     bikeAvaliable: Number,
     slotAvaliable: Number,
     town: String,
     lat: Number,
     lon: Number,
     dist: Number,
})

// Model
var vLille = mongoose.model("vLille", vLilleScheme) // Create collection model from schema
module.exports = vLille // export model