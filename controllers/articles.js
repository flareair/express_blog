'use strict';


exports.index = function(req, res) {
    res.render('articles/index', {
        title: 'Articles',
        metaDescription: 'Articles page',
        activeMenuItem: 'Articles'
    });
};
