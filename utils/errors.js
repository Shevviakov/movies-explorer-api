const {
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require('./httpErrors');

module.exports.userAlreadyExists = new ConflictError('Пользователь с таким email уже существует');
module.exports.userNotFound = new NotFoundError('Запрашиваемый пользователь не найден');
module.exports.movieAlreadyExists = new ConflictError('Фильм с таким movieId уже существует');
module.exports.movieNotFound = new NotFoundError('Фильм не найден');
module.exports.wrongEmailOrPassword = new UnauthorizedError('Неправильные почта или пароль');
module.exports.pathNotFound = new NotFoundError('Запрашиваемый путь не найден');
