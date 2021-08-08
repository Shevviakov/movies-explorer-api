class ConflictError extends Error {
  constructor(message = 'Данные невалидны') {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
  }
}
module.exports = ConflictError;
