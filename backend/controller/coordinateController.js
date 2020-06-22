
const mongoose = require('mongoose');

const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert");
const remove = require("../dbControl/remove");
const connectDb = require("../dbControl/connectDb");

const Coordinates = require('../models/Coordinates');
const WeeklyWeather = require('../models/WeeklyWeather');
const dailyWeatherApi = require("../getWeeklyWeather");

exports.storeCoordinates = function (req, res) {



    const coords = new Coordinates({
        lat: req.body.lat,
        lon: req.body.lon
    });

    replace(Coordinates, coords, () => {});

    // update weather
    dailyWeatherApi.getWeeklyWeather(req.body.lat, req.body.lon, (result) => {

        remove(WeeklyWeather, () => {
            for (const elt in result) {
                insert(result[elt], () => {
                    if (elt == 7) {
                        //mongoose.disconnect();
                    }
                })
            };
        });
    });

};

exports.getCoordinates = function (req, res) {

    //connectDb();

    Coordinates.find({}, (err, founded) => { //find and return all documents inside obj collection
        if (err) throw err // error handling
        res.json(founded);
    });

};