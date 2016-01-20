const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pages');

/*
    Static pages router
*/

// home page
router.get('/', pageController.index);

// about page
router.get('/about', pageController.about);

module.exports = router;
