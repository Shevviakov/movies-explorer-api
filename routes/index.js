const router = require('express').Router();

const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { pathNotFound } = require('../utils/errors');

router.use('/', authRouter);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(pathNotFound);
});

module.exports = router;
