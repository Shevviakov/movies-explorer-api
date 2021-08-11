class UnauthorizedError extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
module.exports = UnauthorizedError;
