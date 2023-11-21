const router = require('express').Router();

const apiBookRouter = require('./api/books.routes');
const apiAuthRouter = require('./api/auth.routes');

router.use('/api/books', apiBookRouter);
router.use('/api/auth', apiAuthRouter);

module.exports = router;
