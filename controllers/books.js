const Book = require('../models/book');
const Genre = require('../models/genre');

module.exports = {
  index,
  new: newBook,
  create,
  mine,
  edit,
  show,
  delete: deleteBook,
  update,
  about
};


async function index(req, res) {
  const books = await Book.find({});
  books.sort((a, b) => b.rating - a.rating);
  console.log(books);
  res.render('books/index', { title: 'Welcome to the Hoard of the Bookwyrm',books});
}

async function mine(req, res) {
  const books = await Book.find({user: req.user._id});
  res.render('books/mine', { title: 'Here is your section',books});
}

async function about(req, res) {
  res.render('books/about', { title: 'Here I am! Rock you like a Hurricane!'});
}

async function edit(req, res) {
  const book = await Book.getOne(req.params.id);
  res.render('books/edit', { title: 'Here I am! Rock you like a Hurricane!', book});
}

async function show(req, res) {
  console.log(req.user);
  const book = await Book.findById(req.params.id).populate("genre");
  res.render('books/show', { title: `${book.title}`, book});
}

async function newBook(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  const genre = await Genre.find({});
  res.render('books/new', { title: 'I thank you for your contribution to my hoard', errorMsg: '', genre });
}

async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  console.log(req.body);
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
    res.render('books/new', {title: 'Wait, Something is wrong!', errorMsg: err.message });
  }
}

function update(req,res){
  req.body.done = !!req.body.done;
  Book.update(req.params.id, req.body);
  res.redirect(`/books/${req.params.id}`);
}

function deleteBook(req,res){
  console.log(req.params.id);
  Book.deleteOne(req.params.id);
  res.redirect('/books');
}