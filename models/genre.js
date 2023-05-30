const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const genreSchema = new Schema({
    genre: {type: String, required: true}

  }, {
    timestamps: true
  });