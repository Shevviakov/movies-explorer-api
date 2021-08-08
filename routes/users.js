const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMe, updateMe } = require('../controllers/users');

const { name, email } = require('../utils/paramValidator');

router.get('/me', getMe);
router.patch(
  '/me',
  celebrate({ body: Joi.object().keys({ name, email }) }),
  updateMe,
);

module.exports = router;
