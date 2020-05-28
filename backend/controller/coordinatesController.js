
const mongoose = require('mongoose');
const replace = require("../replace");
const Coordinates = require('../models/Coordinates');
const coordinatesApi = require("../getCoordinates");

exports.getCoordinates = function(req, res) {

    console.log(req.body);

    // update the available vLille and send it
    /*coordinatesApi.getCoordinates(req.body, (result)=>{
        replace(Coordinates, result, 'coordinatesTable'); // update the old table
        res.json(result);
    });*/

};
