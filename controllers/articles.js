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

        console.log(req.session);

        res.render('articles/index', {
            title: 'Articles',
            metaDescription: 'Articles page',
            activeMenuItem: 'Articles',
            articles: articles,
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
            article: article,
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
        formAction: '/articles/add',
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
        res.render('articles/edit', {
            title: 'Edit article ' + article.title,
            metaDescription: 'Edit article',
            activeMenuItem: 'Articles',
            formAction: '/articles/' + article.id,
            article: article
        });
    });
};


/*

    Adding new article (HTTP method POST)
*/

exports.newArticle = function(req, res, next) {
    var article = new Article(req.body);

    article.save(function(err, newArticle) {
        if (err) {
            return res.status(400).json(err.errors);
        }
        req.flash('success', 'New article saved');
        res.json({saved: true, id: newArticle.id});
    });

};

/*
    Updating article (HTTP method PUT/PATCH)
*/

exports.update = function(req, res, next) {
    var updateOptions = {
        // upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true
    };

    var update = {
        $set: { title: req.body.title, content: req.body.content }
    };

    Article.findOneAndUpdate(
        {_id: req.params.id},
        update,
        updateOptions,
        function(err, article) {
            if (err) {
                return res.status(400).json(err.errors);
            }
            req.flash('success', 'Article updated');
            res.json({updated: true, id: article.id});
        }
    );
};

/*
    Deleting article (HTTP method DELETE)
*/


exports.delete = function(req, res, next) {
    Article.find({_id: req.params.id}).remove(function(err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Article deleted');
        res.json({deleted: true});
    });
};