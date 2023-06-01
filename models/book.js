const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  releaseYear: { type: Number },
  coverURL: { type: String },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: String,
  userAvatar: String,
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },
  reviews: [reviewSchema]
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


bookSchema.virtual('rating')
  .get(function () {
    if (this.reviews.length === 0) return 0;
    let count = 0;
    this.reviews.forEach(function (r) {
      count += r.rating
    });
    return count / this.reviews.length;
  })

// Compile the schema into a model and export it
module.exports = mongoose.model('Book', bookSchema);