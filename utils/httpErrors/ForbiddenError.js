class ForbiddenError extends Error {
  constructor(message = 'Данные невалидны') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}
module.exports = ForbiddenError;
