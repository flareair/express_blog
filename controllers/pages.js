'use strict';


exports.index = function(req, res) {
    res.render('pages/index', {
        title: 'My app',
        metaDescription: 'My app is the best',
        activeMenuItem: 'Home'
    });
};


exports.about = function(req, res) {
    res.render('pages/about', {
        title: 'About',
        metaDescription: 'About my app',
        activeMenuItem: 'About'
    });
};