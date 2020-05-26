const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema // Define Schema method

// Schema
var UsersSchema = new Schema({ // Create Schema
    name: String, // Name of user
    age: Number, // Age of user
    role: String // Role of user
})

// Model
var Users = mongoose.model("Users", UsersSchema) // Create collection model from schema
module.exports = Users // export model