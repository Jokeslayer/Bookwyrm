const express = require('express');
const router = express.Router();
// You'll be creating this controller module next
const booksCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');
	
// GET /books
router.get('/', booksCtrl.index);

router.get('/about', booksCtrl.about);

router.get('/mine', booksCtrl.mine);

// GET /books/new
router.get('/new', ensureLoggedIn, booksCtrl.new);

// POST /books
router.post('/', ensureLoggedIn, booksCtrl.create);
	
module.exports = router;