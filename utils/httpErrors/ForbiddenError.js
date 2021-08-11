class ForbiddenError extends Error {
  constructor(message = 'Операция недоступна') {
    super(message);
    this.name = 'ForbiddenError';
    this.status = 403;
  }
}
module.exports = ForbiddenError;
