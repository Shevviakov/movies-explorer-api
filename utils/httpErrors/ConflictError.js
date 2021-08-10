class ConflictError extends Error {
  constructor(message = 'Данные конфликтуют с уже существующими') {
    super(message);
    this.name = 'ConflictError';
    this.status = 409;
  }
}
module.exports = ConflictError;
