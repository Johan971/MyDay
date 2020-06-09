const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var NBAScheme= new Schema({
    playerName: String,
    playerTeam: String,
    playerPosition: String,
    playerRank: Number
})

// Model
var NBAPlayer = mongoose.model("NBAPlayer", NBAScheme) // Create collection model from schema
module.exports = NBAPlayer // export model