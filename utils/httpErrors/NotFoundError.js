class NotFoundError extends Error {
  constructor(message = 'Ресурс не найден') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}
module.exports = NotFoundError;
