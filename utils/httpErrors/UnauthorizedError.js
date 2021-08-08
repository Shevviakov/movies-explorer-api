class UnauthorizedError extends Error {
  constructor(message = 'Данные невалидны') {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = 401;
  }
}
module.exports = UnauthorizedError;
