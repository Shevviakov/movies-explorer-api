const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');

const { urlRequired, stringRequired, mongoObjectId } = require('../utils/paramValidator');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: stringRequired,
      director: stringRequired,
      duration: stringRequired,
      year: stringRequired,
      description: stringRequired,
      image: urlRequired,
      trailer: urlRequired,
      nameEN: stringRequired,
      nameRU: stringRequired,
      thumbnail: urlRequired,
      movieId: stringRequired,
    }),
  }),
  addMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: mongoObjectId,
    }),
  }),
  deleteMovie,
);

module.exports = router;
