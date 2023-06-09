var express = require('express');
var router = express.Router();
const passport = require('passport');
const Book = require('../models/book')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const books = await Book.find({});
  books.sort((a, b) => b.rating - a.rating);
  res.render('index', {
    best: books[0],
    title: 'Welcome to the hoard of the Bookwyrm!'
  });
});


// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    // prompt: "select_account"
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});

module.exports = router;
