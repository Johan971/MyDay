const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

//Scheme
let EuronextIndexScheme = new Schema({
    curPrice: Number,
    highestPrice: Number,
    lowestPrice: Number,
    priceDifferenceSinceLastClose: Number
});

// Model
var EuronextIndexInformation = mongoose.model("EuronextIndexInformation", EuronextIndexScheme) // Create collection model from schema
module.exports = EuronextIndexInformation // export model