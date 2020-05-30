
module.exports = function(app){

    const newsController = require('../controller/newsController');

    app.route('/api/news').get(newsController.getNews);

};