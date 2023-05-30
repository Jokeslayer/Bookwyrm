const Book = require('../models/book');

module.exports = {
  index,
  new: newBook,
  create,
  mine,
  show,
  about
};

async function index(req, res) {
  const books = await Book.find({});
  res.render('books/index', { title: 'Welcome to the Hoard of the Bookwyrm',books});
}

async function mine(req, res) {
  const books = await Book.find({});
  res.render('books/mine', { title: 'Welcome to the Hoard of the Bookwyrm',books});
}

async function about(req, res) {
  res.render('books/about', { title: 'Here I am! Rock you like a Hurricane!'});
}

async function show(req, res) {
  console.log(req.user);
  const book = await Book.findById(req.params.id);
  res.render('books/show', { title: `${book.title}`, book});
}

function newBook(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('books/new', { title: 'I thank you for your contribution to my hoard', errorMsg: '' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    // Update this line because now we need the _id of the new book
    const book = await Book.create(req.body);
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('books/new', {title: 'I thank you for your contribution to my hoard',errorMsg: err.message });
  }
}