const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var CoordinatesScheme = new Schema({ // Create Schema
    lat: Number,
    lon: Number
})

// Model
var Coordinates = mongoose.model("Coordinates", CoordinatesScheme) // Create collection model from schema
module.exports = Coordinates // export model