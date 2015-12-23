const express = require('express');
const router = express.Router();

const pageController = require('../controllers/pages');

/* GET home page. */
router.get('/', pageController.index);

router.get('/about', pageController.about);

module.exports = router;
