const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/httpErrors');

const { JWT_SECRET } = require('../utils/const');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError());
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;
  return next();
};
