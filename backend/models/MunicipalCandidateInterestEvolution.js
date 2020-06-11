const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

//Scheme
let CandidateInterestEvolutionScheme = new Schema({
    candidateName: String,
    date: Date,
    interestRateAtDate: Number
});

// Model
var CandidateInterestEvolution = mongoose.model("CandidateInterestEvolution", CandidateInterestEvolutionScheme) // Create collection model from schema
module.exports = CandidateInterestEvolution // export model