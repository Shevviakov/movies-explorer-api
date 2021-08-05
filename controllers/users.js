const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(mongooseErrorHandler(err)));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  if (!(name && email)) next(new BadRequestError('Параметры name и about обязательны')); // TODO

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => (user ? res.send(user) : next(new NotFoundError('Запрашиваемый пользователь не найден'))))
    .catch((err) => next(mongooseErrorHandler(err)));
};


module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует'));
      else next(mongooseErrorHandler(err));
    });
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => next(new UnauthorizedError(err.message)));  // TODO
};