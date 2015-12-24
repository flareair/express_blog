const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');

/* GET articles main page. */
router.get('/', articlesController.index);
router.get('/add', articlesController.add);
router.get('/:id', articlesController.show);
router.get('/:id/edit', articlesController.edit);

router.post('/add', articlesController.newArticle);

// router.put('')

router.delete('/:id', articlesController.delete);



module.exports = router;