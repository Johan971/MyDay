
const mongoose = require('mongoose');

const replace = require("../replace");
const read = require("../read"); // Database read module
const insert = require("../insert"); // Database read module

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