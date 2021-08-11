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
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) return Promise.reject(movieNotFound);
      if (!movie.owner.equals(req.user._id)) return Promise.reject(new ForbiddenError());
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch((err) => next(mongooseErrorHandler(err)));
};
