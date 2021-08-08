const User = require('../models/user');
const {
  mongooseErrorHandler,
  NotFoundError,
} = require('../utils/httpErrors');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(mongooseErrorHandler(err)));
};

module.exports.updateMe = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => (user ? res.send(user) : next(new NotFoundError('Запрашиваемый пользователь не найден'))))
    .catch((err) => next(mongooseErrorHandler(err)));
};
