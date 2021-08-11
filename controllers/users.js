const User = require('../models/user');
const {
  mongooseErrorHandler,
} = require('../utils/httpErrors');
const {
  userAlreadyExists,
  userNotFound,
} = require('../utils/errors');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => next(mongooseErrorHandler(err)));
};

module.exports.updateMe = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user && !user._id.equals(req.user._id)) return Promise.reject(userAlreadyExists);
      return User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true, runValidators: true },
      );
    })
    .then((user) => (user ? res.send(user) : next(userNotFound)))
    .catch((err) => next(mongooseErrorHandler(err)));
};
