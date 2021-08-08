const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { NotFoundError, errorHandler } = require('./utils/httpErrors');

const {
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(requestLogger);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.use(auth);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый путь не найден'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
