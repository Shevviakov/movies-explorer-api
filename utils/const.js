const { JWT_SECRET = 'dev-key' } = process.env;

module.exports.JWT_SECRET = JWT_SECRET;
