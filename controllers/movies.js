const Movie = require('../models/movie');
const {
  ConflictError,
  NotFoundError,
  ForbiddenError,
  mongooseErrorHandler,
} = require('../utils/httpErrors');

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
        next(new ConflictError('Фильм с таким movieId уже существует'));
      } else {
        next(mongooseErrorHandler(err));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) return Promise.reject(new NotFoundError('Фильм с таким movieId не найден'));
      if (!movie.owner.equals(req.user._id)) return Promise.reject(new ForbiddenError('Операция недоступна'));
      return Movie.findByIdAndDelete(req.params.movieId);
    })
    .then((movie) => res.send(movie))
    .catch((err) => next(mongooseErrorHandler(err)));
};
