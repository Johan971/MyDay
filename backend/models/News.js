const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var NewsScheme= new Schema({
     source: String,
     author: String,
     title: String,
     description: String,
     content: String,
     imageUrl:String,
     articleUrl: String
})

// Model
var News = mongoose.model("News", NewsScheme) // Create collection model from schema
module.exports = News // export model