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

exports.add = function(req, res, next) {
    res.render('articles/add', {
        title: 'Add article',
        metaDescription: 'Add article',
        activeMenuItem: 'Articles',
        article: new Article()
    });
};


exports.newArticle = function(req, res, next) {
    var article = new Article(req.body);

    article.save(function(err) {
        if (err) {
            return res.render('articles/add', {
                title: 'Add article',
                metaDescription: 'Add article',
                activeMenuItem: 'Articles',
                article: req.body,
                errors: err.errors
            });
        }

        res.redirect('/articles');
    });
};