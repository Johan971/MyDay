const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

//Scheme
let BTCScheme = new Schema({
    time: Number,
    price: Number
});

// Model
var BTCPrice = mongoose.model("BTCPrice", BTCScheme) // Create collection model from schema
module.exports = BTCPrice // export model