const { Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

module.exports = {
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  stringRequired: Joi.string().required(),
  numberRequired: Joi.number().required(),
  urlRequired: Joi.string().required().custom((value, helper) => (
    validator.isURL(value) ? value : helper.message('URL is not valid')
  )),
  mongoObjectId: Joi.string().custom((value, helper) => (
    mongoose.Types.ObjectId.isValid(value) ? value : helper.message('Value must be valid Mongo ObjectId')
  )),
};
