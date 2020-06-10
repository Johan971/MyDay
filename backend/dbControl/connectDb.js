const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect("mongodb://localhost:27017/MyDay", { //attempt to connect to database
        useNewUrlParser: true, // Recommended, insures support for future MongoDB drivers
        useUnifiedTopology: true // Recommended, uses new MongoDB topology engine
    }).catch(error => console.log(error)) // Error handling


    mongoose.connection.on('connected', function () { // On connection
        //console.log('Successful connection with database: mongodb://localhost:27017/MyDay'); // Callback for successful connection
    });
}