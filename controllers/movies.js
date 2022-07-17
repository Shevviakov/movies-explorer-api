const Movie = require('../models/movie');
const {
  ForbiddenError,
  mongooseErrorHandler,
} = require('../utils/httpErrors');
const {
  movieAlreadyExists,
  movieNotFound,
} = require('../utils/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(mongooseErrorHandler(err)));
};
module.exports.addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(movieAlreadyExists);
      } else {
        next(mongooseErrorHandler(err));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOneAndRemove({ onwer: { _id: req.user._id }, movieId: req.params.movieId })
    .then((movie) => res.send(movie))
    .catch((err) => next(mongooseErrorHandler(err)));
};
