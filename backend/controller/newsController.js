
const mongoose = require('mongoose');

const replace = require("../dbControl/replace");
const read = require("../dbControl/read"); // Database read module
const insert = require("../dbControl/insert"); // Database read module

const News = require('../models/News');
const newsApi = require("../getNews");

exports.getNews = function(req, res) {

    // TODO : store coordonates with replace

    // update weather
    newsApi.getNews((result) => {
        //replace(DailyWeather, result, 'dailyWeatherTable');
        insert(result, 'newsTable');
        read(News, 'newsTable');
    });
}