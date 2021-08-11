const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signup, signin, signout } = require('../controllers/auth');

const { name, email, password } = require('../utils/paramValidator');

const signupParams = celebrate({
  body: Joi.object().keys({ name, email, password }),
});

const signinParams = celebrate({
  body: Joi.object().keys({ email, password }),
});

router.post('/signup', signupParams, signup);
router.post('/signin', signinParams, signin);
router.post('/signout', signout);

module.exports = router;
