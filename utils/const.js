const {
  JWT_SECRET = 'dev-key',
  MONGODB = 'mongodb://localhost:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV = 'dev',
} = process.env;

module.exports = {
  JWT_SECRET,
  MONGODB,
  PORT,
  NODE_ENV,
};
