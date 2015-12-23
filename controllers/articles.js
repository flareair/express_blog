'use strict';

const Article = require('../models/article');

exports.index = function(req, res, next) {

    Article.find({}, function(err, articles) {
        if (err) {
            return next(err);
        }

        console.log(articles);

        res.render('articles/index', {
            title: 'Articles',
            metaDescription: 'Articles page',
            activeMenuItem: 'Articles',
            articles: articles
        });
    });



};
