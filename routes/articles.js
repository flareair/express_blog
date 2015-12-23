const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');

/* GET articles main page. */
router.get('/', articlesController.index);

module.exports = router;