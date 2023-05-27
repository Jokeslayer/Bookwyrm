const Book = require('../models/book');


module.exports = {
  index,
  new: newBook,
  create
};

async function index(req, res) {
  const books = await Book.find({});
  res.render('books/index', { title: 'All Books', books });
}

function newBook(req, res) {
  // We'll want to be able to render an  
  // errorMsg if the create action fails
  res.render('books/new', { title: 'Add Book', errorMsg: '' });
}

async function create(req, res) {
  try {
    // Update this line because now we need the _id of the new book
    const book = await Book.create(req.body);
    // Redirect to the new book's show functionality 
    res.redirect(`/books/${book._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('books/new', { errorMsg: err.message });
  }
}