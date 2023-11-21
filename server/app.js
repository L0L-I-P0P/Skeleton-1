require('dotenv').config();

const express = require('express');
const config = require('./config/serverConfig');
const checkUser = require('./middlewares/verifyJWT');

const app = express();

const PORT = process.env.PORT || 4000;

const indexRouter = require('./routes/index.routes');

config(app);

app.use(checkUser);
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App has been started in port ${PORT}...`);
});
