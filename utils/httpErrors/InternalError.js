class InternalError extends Error {
  constructor(message = 'Произошла ошибка') {
    super(message);
    this.name = 'InternalError';
    this.status = 500;
  }
}
module.exports = InternalError;
