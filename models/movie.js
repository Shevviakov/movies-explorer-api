const mongoose = require('mongoose');
const validator = require('validator');

const requiredString = {
  type: String,
  required: true,
};

const urlValidator = {
  validator: validator.isURL,
  message: (props) => `${props.value} is not a valid uri!`,
};

const requiredURL = { ...requiredString, validate: urlValidator };

const movieSchema = new mongoose.Schema({
  country: requiredString,
  director: requiredString,
  duration: {
    type: Number,
    required: true,
  },
  year: requiredString,
  description: requiredString,
  image: requiredURL,
  trailer: requiredURL,
  thumbnail: requiredURL,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: requiredString,
  nameRU: requiredString,
  nameEN: requiredString,
});

movieSchema.index({ owner: 1, movieId: 1 }, { unique: 1 });

module.exports = mongoose.model('movie', movieSchema);
