const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  mongooseErrorHandler,
  UnauthorizedError,
  ConflictError,
} = require('../utils/httpErrors');

const { JWT_SECRET } = require('../utils/const');

const EXPIRATION_TIME_DAYS = 7;

module.exports.signup = (req, res, next) => {
  const { name, password, email } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => res.send({ name, email }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(mongooseErrorHandler(err));
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: `${EXPIRATION_TIME_DAYS}d` },
      );
      res
        .cookie('jwt', token, {
          maxAge: (3600000 * 24 * EXPIRATION_TIME_DAYS),
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => next(new UnauthorizedError(err.message)));
};

module.exports.signout = (req, res) => {
  res.clearCookie('jwt').end();
};
