const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var NewsScheme = new Schema({ // Create Schema
    news: Array
})

// Model
var News = mongoose.model("News", NewsScheme) // Create collection model from schema
module.exports = News // export model