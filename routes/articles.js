const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');

/* GET articles main page. */
router.get('/', articlesController.index);
router.get('/add', articlesController.add);


router.post('/add', articlesController.newArticle);

module.exports = router;