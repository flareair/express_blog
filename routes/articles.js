const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');

/*
    Articles router
*/

// list of all articles page
router.get('/', articlesController.index);
// add page
router.get('/add', articlesController.add);

// show single article page
router.get('/:id', articlesController.show);
// edit article page
router.get('/:id/edit', articlesController.edit);

// Ajax post for new article
router.post('/add', articlesController.newArticle);

// Ajax put/patch for editing article
router.put('/:id', articlesController.update);
router.patch('/:id', articlesController.update);

// Ajax delete for deleting article
router.delete('/:id', articlesController.delete);



module.exports = router;