const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /books
router.get('/', booksCtrl.index);

router.get('/about', booksCtrl.about);

router.get('/:id/edit', ensureLoggedIn, booksCtrl.edit);

router.get('/mine', ensureLoggedIn, booksCtrl.mine);

// GET /books/new
router.get('/new', ensureLoggedIn, booksCtrl.new);

// POST /books
router.post('/', ensureLoggedIn, booksCtrl.create);

router.get('/:id', booksCtrl.show);

router.put('/:id', ensureLoggedIn, booksCtrl.update);

router.delete('/:id', ensureLoggedIn, booksCtrl.delete);

module.exports = router;