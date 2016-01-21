const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users');

/*
    Articles router
*/

// list of all articles page
router.get('/profile', isLoggedIn, usersController.profile);
// add page
router.get('/login', usersController.login);
router.get('/logout', usersController.login);

// show single article page
router.get('/signup', usersController.singUp);


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;