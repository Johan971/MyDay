
const mongoose = require('mongoose');
const connectDb = require("../dbControl/connectDb");
const EuronextIndexInformation = require('../models/EuronextIndexInformation');
const EuronextIndexInformationApi = require("../getEuronextInformation");

exports.getEuronextIndexInformation = function(req, res) {


    connectDb();

    EuronextIndexInformation.find({}, (err, founded) => { //find and return all documents inside obj collection
        if (err) throw err // error handling
        res.json(founded);
        mongoose.disconnect();
    });

};
