'use strict';

/*
    Static pages controller
*/

/*
    Index page
*/

exports.index = function(req, res) {
    res.render('pages/index', {
        title: 'My app',
        metaDescription: 'My app is the best',
        activeMenuItem: 'Home'
    });
};

/*
    About page
*/

exports.about = function(req, res) {
    res.render('pages/about', {
        title: 'About',
        metaDescription: 'About my app',
        activeMenuItem: 'About'
    });
};