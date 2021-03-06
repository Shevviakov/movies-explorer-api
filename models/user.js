const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { wrongEmailOrPassword } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Невалидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(wrongEmailOrPassword);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(wrongEmailOrPassword);
          }
          return user;
        });
    });
}
userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
