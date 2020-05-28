
const mongoose = require('mongoose');
const replace = require("../replace");
const vLille = require('../models/vLille');
const vLilleApi = require("../getAvailableVLille");

exports.getAvailableVLille = function(req, res) {

    // update the available vLille and send it
    vLilleApi.getAvailableVLille((result)=>{
        replace(vLille, result, 'vLilleTable'); // update the old table
        res.json(result);
    });

};
