const BadRequestError = require('./BadRequestError');
const InternalError = require('./InternalError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status, message } = err.status ? err : new InternalError();
  return res.status(status).send({ message });
};

const mongooseErrorHandler = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') return new BadRequestError();
  return err;
};

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
  errorHandler,
  mongooseErrorHandler,
};
