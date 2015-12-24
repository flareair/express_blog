'use strict';

const Article = require('../models/article');

/*
    list of all articles page
*/

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
            articles: articles,
            message: req.query.message
        });
    });

};


/*
    show single article page
*/

exports.show = function(req, res, next) {
    Article.findById(req.params.id, function(err, article) {
        if (err) {
            return next();
        }

        res.render('articles/show', {
            title: article.title,
            metaDescription: article.title,
            activeMenuItem: 'Articles',
            article: article
        });
    });
};

/*
    show new article page
*/

exports.add = function(req, res, next) {
    res.render('articles/add', {
        title: 'Add article',
        metaDescription: 'Add article',
        activeMenuItem: 'Articles',
        article: new Article()
    });
};


/*
    Show edit article page
*/

exports.edit = function(req, res, next) {
    Article.findById(req.params.id, function(err, article) {
        if (err) {
            return next();
        }
        console.log(article);
        res.render('articles/edit', {
            title: 'Edit article ' + article.title,
            metaDescription: 'Edit article',
            activeMenuItem: 'Articles',
            article: article
        });
    });
};


/*

    Adding new article (HTTP method POST)
*/

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

/*
    Updating article (HTTP method PUT/PATCH)
*/

exports.update = function(req, res, next) {
    //
};

/*
    Deleting article (HTTP method DELETE)
*/


exports.delete = function(req, res, next) {
    Article.find({_id: req.params.id}).remove(function(err) {
        if (err) {
            return next(err);
        }
        res.end('ok');
    });
};