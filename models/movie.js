const mongoose = require('mongoose');
const validator = require('validator');


const requiredString = {
  type: String,
  required: true,
};

const urlValidator = {
  validator: (v) => /https?:\/\/(w{3}\.)?[-\w._~:/?#[\]@!$&'()*+,;=]+#?/.test(v),
  message: (props) => `${props.value} is not a valid uri!`,
};

const requiredURL = {...requiredString,  validate: urlValidator};

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
  nameEN: requiredString
});

module.exports = mongoose.model('movie', movieSchema);