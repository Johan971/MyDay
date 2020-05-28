const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var vLilleScheme = new Schema({ // Create Schema
     activeStations: Array
})

// Model
var vLille = mongoose.model("vLille", vLilleScheme) // Create collection model from schema
module.exports = vLille // export model