class BadRequestError extends Error {
  constructor(message = 'Данные невалидны') {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}
module.exports = BadRequestError;
